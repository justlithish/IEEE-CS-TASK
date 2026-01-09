Companion — AI Smartwatch Landing Page 

This project is a frontend replica-style landing page inspired by the Companion AI product website.
It is intentionally designed to look like it was built by a learner / early-stage developer, while still demonstrating modern UI interactions, animations, and scroll-based effects using HTML, CSS, and JavaScript.

Project Overview

Companion is a concept AI-enabled smartwatch that acts as a personal assistant, providing emotional, practical, and health-related support through AI-driven interactions.
This landing page showcases the product’s purpose, features, device details, and working process in an engaging and interactive way.

The project focuses on:

Visual storytelling

Smooth scrolling interactions

Scroll-triggered animations

Lightweight JavaScript logic


Technologies Used

HTML5 – Structure and semantic layout

CSS3 – Styling, animations, responsiveness

JavaScript (Vanilla JS) – Interactivity and logic

jQuery (1.10.2) – Used for parity with the original inspiration

Lottie-Web – For vector animations

IntersectionObserver API – Scroll-based animations and counters


Features Implemented

Preloader

Animated loading bar

Automatically fades after page load

Fallback timeout if load takes too long


Dynamic Header

Header hides on scroll down

Reappears when scrolling up

Smooth and performance-optimized using requestAnimationFrame


Hero Section

Animated headline with staggered word reveal

Product description and CTA button

Phone mockup with video / image fallback


Scroll-Based Animations

Sections animate when they enter the viewport

Uses IntersectionObserver for performance

Slide-in effects for cards and sections


Phone Mock Interaction

Content inside phone updates based on scroll steps

Video autoplay when visible (muted for browser policy)

Image fallback if autoplay fails


“For Whom” Section

Grid-based cards targeting different user needs

Keyboard accessible (tabindex support)


Device Details Section

Product image with caption

Specifications displayed using animated cards

Clear breakdown of features and hardware


 How It Works (Step-by-Step)

Interactive steps with hover/focus support

Each step updates a preview image dynamically

Clean and readable flow for user understanding


Animated Counters

Number counters animate when visible

Used for metrics like integrations, satisfaction, deploys


Highlight Cards

Image cards with overlay effects

Tilt interaction on mouse move

Hover-based visual depth effect


JavaScript Functionality Breakdown

Preloader handling

Scroll direction detection

IntersectionObserver for animations

Smooth internal navigation

Lottie animation loader

Video visibility-based playback

Headline word animation

DOM mutation cleanup

Animated number counters

Parallax phone movement

Card tilt interactions

All scripts are written in a modular IIFE pattern to avoid global scope pollution.


Accessibility Considerations

Semantic HTML elements

aria-label usage for key sections

Keyboard navigation via tabindex

Motion effects kept subtle to reduce strain

How to Run the Project

Clone or download the repository

Place all assets inside the assets/ folder

Open index.html in any modern browser

(Optional) Run using a local server for video autoplay support


Customization Guide

Replace images in /assets/images

Replace phone-demo.mp4 with your own demo video

Edit product text inside <section class="hero">

Modify animations in styles.css

Adjust scroll thresholds in JavaScript observers


Limitations

Not connected to a backend

No real AI functionality (UI concept only)

Local file paths must be converted for deployment

Designed primarily for desktop (can be extended to mobile)


Learning Outcomes

This project demonstrates:

Modern frontend animation techniques

Scroll-driven UI behavior

Performance-conscious JavaScript

Real-world landing page structure

Clean separation of concerns


 Done by

Lithish Manan A S
B.Tech – Information Technology
VIT (SCORE)
REG.NO : 24BIT0563