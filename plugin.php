<?php
/**
 * Plugin Name: Before You Go
 * Description: Editorial tool to show offers or recirculation prompts as a reader exits the site.
 * Author: Human Made
 * Author URI: https://humanmade.com
 * Version: 0.0.1
 */

namespace Before_You_Go;

require_once __DIR__ . '/inc/namespace.php';
bootstrap();

require_once __DIR__ . '/inc/assets.php';
Assets\bootstrap();

require_once __DIR__ . '/inc/post-types/byg-page.php';
Post_Types\BYG_Page\bootstrap();
