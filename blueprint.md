# Mental Health Companion

## Overview

This application is a mental health companion that provides a safe and supportive space for users to share their thoughts and feelings. The application has a modern and sci-fi inspired design to create an engaging and comfortable user experience.

## Project Structure

- **/app**
  - **/conversation**
    - `page.tsx`: The main conversation screen where the user interacts with the AI.
    - `actions.ts`: Server Actions for handling AI responses.
  - **/welcome**
    - `page.tsx`: The initial welcome screen that greets the user.
  - **/components**
    - `Avatar.tsx`: An animated avatar for the AI.
    - **/icons**
      - `EndCallIcon.tsx`: Icon for the end call button.
      - `MicrophoneIcon.tsx`: Icon for the microphone button.
  - `layout.tsx`: The main layout for the application.
  - `page.tsx`: The root page that redirects to the welcome screen.
- `tailwind.config.ts`: Tailwind CSS configuration.
- `next.config.mjs`: Next.js configuration.

## Design and Features

### Welcome Screen

- **Engaging Introduction**: A welcoming message with the heading "Ready to talk?" and a supportive subheading.
- **Modern Button**: A prominent "Start Talking" button with a gradient and hover effect that navigates the user to the conversation screen.
- **Animated Fade-in**: The entire screen has a fade-in animation for a smooth user experience.

### Conversation Screen

- **Animated Avatar**: A pulsating avatar to give the AI a visual presence.
- **Interactive Controls**: Microphone and end call buttons with icons and hover effects.
- **Transcript Display**: A designated area to display the conversation transcript.
- **Clean Layout**: A centered layout with a dark theme that is consistent with the welcome screen.

## Current Plan

The current focus is to implement the core conversational functionality of the AI companion. This involves the following steps:

1.  **Speech-to-Text**: I will implement speech-to-text functionality using the Web Speech API to capture the user's voice and convert it into text.
2.  **AI Response Generation**: The transcribed text will be sent to a generative AI model to get a response. I will use Server Actions to handle this server-side logic.
3.  **Text-to-Speech**: The AI's response will be converted to speech using the Web Speech API, making the conversation feel more natural.
4.  **State Management**: The component's state will be updated to manage the conversation flow, including the transcript, and the microphone status.
