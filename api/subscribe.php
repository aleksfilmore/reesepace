<?php
/**
 * MailerLite Newsletter Signup Handler (Server-side)
 * Use this for production to keep your API token secure
 * 
 * Usage: POST to this file with email parameter
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Configuration
$MAILERLITE_API_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMWUwZmQ4NDAwY2MyZGJjNGZjZWJlZDhmZjBjNzk4MzhkNzZmZDllYjM1ZWU4OTI5YmEyMjNhZmU2NjVjZjUzMTA3NzAyOWYxMTc0OGFhZWQiLCJpYXQiOjE3NTc2ODMyMjcuNjEyODQ4LCJuYmYiOjE3NTc2ODMyMjcuNjEyODUxLCJleHAiOjQ5MTMzNTY4MjcuNjA3Nzk3LCJzdWIiOiIxODA4MTA5Iiwic2NvcGVzIjpbXX0.bLgg_7eK1EnWaWc4dJP0kOfoUdTAN9DrjYy8uDrvG9OVMvMb_EemgrgB52Wmryu2hYhogQbc4Spwo3CYsbnkrYs8USWql9KhGXzt0iR38dBd5FAT9kGcJ718nuT1tpMZh0Ay0Mi3UqB6n4xZasoUx5hziAcdabblauef0yNxUWLNC4ujbwNoYqATC4jexdZQJiiMjL5W8t7sOPkhwwWS82j85cefpf9-Gfgm7kYVYgbqHNKLLIYf8dMUkUbkOFFYpKO5x9VGcBtHMr3LR6IpWpUsjcC1phxmaTOrvH94TODLNCBHaEI2Cix96fqAAiX7zINtIW8xgGU2vuPhz_oew6UNePJWKRbTmhRxIgjgM59T_UBAnXWt7cY1OjaEpa3QnRhmRzrARudcwdkxP9gSgvtSjCrO2e9jk4WxdKKB_Fa1fze7C9hLQkf3b19PlJWkUDe5hxO-WG_5ioHeqJRxuinJZwnjhPW13L9k5v1gLNUdcbg2VBVfsazwZ9g1S5CDUIQOMFq9yGIXtVx-Bm2LIScnLcc0py1vAqL2V_sdW3zMQWXkIFPx5cUxQXzblmXofnoPJUZSIF2qp42p9znHkg2zYfx754V-d--mV6YhpTvzcRNFOLnJD_FWaaXzqqiHBYD2kZKaS299xli8lyyHpzulRRRjfpfzfS_MYw7CAYw';
$MAILERLITE_API_BASE = 'https://connect.mailerlite.com/api';
$GROUP_NAME = 'Best Efforts Bonus Scene Subscribers';

function makeMailerLiteRequest($endpoint, $method = 'GET', $data = null) {
    global $MAILERLITE_API_TOKEN, $MAILERLITE_API_BASE;
    
    $headers = [
        'Authorization: Bearer ' . $MAILERLITE_API_TOKEN,
        'Content-Type: application/json',
        'Accept: application/json'
    ];
    
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $MAILERLITE_API_BASE . '/' . $endpoint,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_POSTFIELDS => $data ? json_encode($data) : null,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => true
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    return [
        'code' => $httpCode,
        'body' => json_decode($response, true)
    ];
}

function getOrCreateGroup($groupName) {
    // Try to find existing group
    $response = makeMailerLiteRequest('groups');
    
    if ($response['code'] === 200 && $response['body']['data']) {
        foreach ($response['body']['data'] as $group) {
            if ($group['name'] === $groupName) {
                return $group['id'];
            }
        }
    }
    
    // Create new group if not found
    $response = makeMailerLiteRequest('groups', 'POST', [
        'name' => $groupName,
        'type' => 'regular'
    ]);
    
    if ($response['code'] === 201) {
        return $response['body']['data']['id'];
    }
    
    // Fallback: use first available group
    $response = makeMailerLiteRequest('groups');
    if ($response['code'] === 200 && !empty($response['body']['data'])) {
        return $response['body']['data'][0]['id'];
    }
    
    return null;
}

function subscribeUser($email, $groupId) {
    $subscriberData = [
        'email' => $email,
        'groups' => [$groupId],
        'status' => 'active'
    ];
    
    $response = makeMailerLiteRequest('subscribers', 'POST', $subscriberData);
    
    return [
        'success' => $response['code'] === 201 || $response['code'] === 200,
        'code' => $response['code'],
        'data' => $response['body']
    ];
}

// Validate input
$input = json_decode(file_get_contents('php://input'), true);
$email = filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL);

if (!$email) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email address']);
    exit;
}

try {
    // Get or create the subscriber group
    $groupId = getOrCreateGroup($GROUP_NAME);
    
    if (!$groupId) {
        throw new Exception('Failed to create or find subscriber group');
    }
    
    // Subscribe the user
    $result = subscribeUser($email, $groupId);
    
    if ($result['success']) {
        echo json_encode([
            'success' => true,
            'message' => 'Successfully subscribed! Check your email for the bonus scene.'
        ]);
    } else {
        $errorMessage = 'Subscription failed';
        
        // Handle specific error cases
        if ($result['code'] === 422 && isset($result['data']['errors']['email'])) {
            $errorMessage = 'This email is already subscribed';
        }
        
        echo json_encode([
            'success' => false,
            'error' => $errorMessage
        ]);
    }
    
} catch (Exception $e) {
    error_log('MailerLite subscription error: ' . $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Server error occurred. Please try again.'
    ]);
}
?>
