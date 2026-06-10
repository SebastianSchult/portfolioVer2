<?php

const ALLOWED_ORIGIN  = 'https://sebastian-schult-dev.de';
const RECIPIENT       = 'contact@sebastian-schult-dev.de';
const RATE_LIMIT_FILE = '/tmp/portfolio_ratelimit.json';
const RATE_LIMIT_MAX  = 5;
const RATE_LIMIT_WIN  = 3600;

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

function sendCorsHeaders(string $origin): void {
    if ($origin === ALLOWED_ORIGIN) {
        header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
    }
    header('Vary: Origin');
}

function sanitize(string $value): string {
    return trim(preg_replace('/[\r\n\t]/', ' ', $value));
}

function isRateLimited(string $ip): bool {
    $now  = time();
    $data = [];

    if (file_exists(RATE_LIMIT_FILE)) {
        $raw  = @file_get_contents(RATE_LIMIT_FILE);
        $data = $raw ? (json_decode($raw, true) ?? []) : [];
    }

    $timestamps = $data[$ip] ?? [];
    $timestamps = array_values(array_filter($timestamps, fn($t) => $now - $t < RATE_LIMIT_WIN));

    if (count($timestamps) >= RATE_LIMIT_MAX) {
        return true;
    }

    $timestamps[] = $now;
    $data[$ip]    = $timestamps;
    @file_put_contents(RATE_LIMIT_FILE, json_encode($data), LOCK_EX);

    return false;
}

switch ($_SERVER['REQUEST_METHOD']) {
    case 'OPTIONS':
        sendCorsHeaders($origin);
        header('Access-Control-Allow-Methods: POST');
        header('Access-Control-Allow-Headers: content-type');
        exit;

    case 'POST':
        sendCorsHeaders($origin);

        $ip     = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
        $params = json_decode(file_get_contents('php://input'));

        // Honeypot: legitimate users leave this blank; bots fill it
        if (!empty($params->website ?? '')) {
            http_response_code(200);
            exit;
        }

        if (isRateLimited($ip)) {
            http_response_code(429);
            exit;
        }

        $email   = filter_var($params->email   ?? '', FILTER_VALIDATE_EMAIL);
        $name    = sanitize($params->name    ?? '');
        $message = sanitize($params->message ?? '');

        if (!$email || $name === '' || $message === '') {
            http_response_code(400);
            exit;
        }

        $headers   = [];
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=utf-8';
        $headers[] = 'From: ' . RECIPIENT;
        $headers[] = 'Reply-To: ' . $email;

        mail(
            RECIPIENT,
            'Portfolio Contact Form',
            'From: ' . htmlspecialchars($name) . '<br>' . htmlspecialchars($message),
            implode("\r\n", $headers)
        );

        $confirmHeaders   = [];
        $confirmHeaders[] = 'MIME-Version: 1.0';
        $confirmHeaders[] = 'Content-type: text/html; charset=utf-8';
        $confirmHeaders[] = 'From: ' . RECIPIENT;

        mail(
            $email,
            'Thank you for reaching out!',
            'Hello ' . htmlspecialchars($name) . ',<br><br>Thank you for contacting me. I have received your message and will respond as soon as possible.<br><br>Best regards,<br>Sebastian Schult',
            implode("\r\n", $confirmHeaders)
        );

        break;

    default:
        header('Allow: POST', true, 405);
        exit;
}
