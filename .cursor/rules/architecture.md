# Architecture Rules

## Project Overview

This project is a premium digital hospitality experience for Anshul and Sarah's wedding in Kumarakom, Kerala.

This is NOT a traditional wedding invitation website.

It is an editorial storytelling experience that helps international guests understand the wedding, Kerala, Indian traditions, and their entire journey before arriving.

Every feature should support that vision.

---

# Core Architecture

Framework

- Next.js 15
- App Router
- TypeScript

Styling

- Tailwind CSS v4
- shadcn/ui

CMS

- Sanity

Database

- Supabase

Deployment

- Vercel

---

# Folder Responsibilities

## app/

Contains only routing.

Never build reusable UI here.

Pages should compose existing components.

---

## components/

Contains reusable UI only.

Business logic does not belong inside components.

Organize by feature.

Example

components/

layout/

home/

events/

shared/

ui/

animations/

---

## lib/

Utilities.

Fonts

Metadata

Helpers

Sanity

Supabase

Never place React UI inside lib.

---

## services/

API integrations.

Sanity

Supabase

Future third-party services.

---

## hooks/

Reusable hooks only.

---

## providers/

React providers.

Theme

Query

Future providers.

---

## types/

Shared interfaces.

---

## constants/

Navigation

Routes

Events

Static content

---

## styles/

Design tokens

Typography

Animations

Utilities

---

## public/

Static assets only.

Images

Icons

Illustrations

Textures

Patterns

Kerala assets

---

# Component Principles

Small

Reusable

Composable

Accessible

Mobile-first

No duplicated logic.

---

# Data Flow

Sanity

↓

Content

↓

Components

↓

UI

Supabase

↓

RSVP

↓

Dashboard

↓

Guest Management

Never mix CMS data with guest data.

---

# Future Scalability

The architecture should support

Multiple weddings

Multiple destinations

Additional CMS content

Admin dashboard

Guest authentication

Without requiring a complete rewrite.

Always think ahead.