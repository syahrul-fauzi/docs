---
title: "SBA Marketing CMS Implementation Guide"
created_at: 2025-12-28
author: SBA-Agent
status: draft
---

# SBA Marketing CMS Implementation Guide

## Overview

This document provides a comprehensive implementation guide for the SBA Marketing CMS and Marketing Application based on the Feature-Sliced Design (FSD) architecture with BaseHub CMS integration.

## Architecture Implementation

### 1. CMS Package Structure (`packages/cms`)

The CMS package serves as the central content management system with the following components:

#### Core Services

- **BaseHub Client**: GraphQL client with server-only authentication
- **Content Services**: Page, post, navigation, and section management
- **SEO Services**: Dynamic metadata generation and structured data
- **Preview System**: Draft mode for content preview with token authentication
- **Webhook Handler**: Cache invalidation on content updates
- **Cache Management**: ISR and cache tag management

#### Schema Definition

- **Content Types**: Pages, Posts, Authors, Navigation Items
- **Block Types**: Hero, Text, Image, Testimonials, CTA Banners
- **Validation**: Zod schemas for content validation
- **TypeScript**: Full type safety throughout the application

### 2. Marketing Application (`apps/marketing`)

The marketing application follows Feature-Sliced Design principles:

#### Page Structure

- **Homepage**: Hero section, value props, testimonials, CTA banners
- **Blog**: Article listings with pagination and filtering
- **Blog Post**: Individual article view with rich content
- **Pricing**: Pricing tiers and feature comparison
- **Contact**: Contact form and scheduling integration

#### Feature Components

- **Hero Section**: Animated headlines with background media
- **Value Props**: Icon cards with descriptions
- **Testimonials**: Customer reviews with ratings
- **CTA Banner**: Prominent call-to-action sections
- **Blog List**: Responsive grid with featured images
- **Navigation**: Responsive navigation with mobile support

#### Shared Components

- **UI Components**: Reusable components from `@sba/ui`
- **Utilities**: Helper functions and configuration
- **Styling**: Tailwind CSS with violet/zinc theme
- **Analytics**: Event tracking integration

## Implementation Steps

### Phase 1: CMS Foundation

1. **Set up BaseHub Account**
   - Create BaseHub project
   - Define content schema using provided configuration
   - Generate API token and webhook secret

2. **Configure Environment**

   ```bash
   # Set up environment variables
   BASEHUB_TOKEN=your_basehub_token
   BASEHUB_WEBHOOK_SECRET=your_webhook_secret
   NEXT_PUBLIC_BASE_URL=https://your-domain.com
   PREVIEW_TOKEN_SECRET=your_preview_secret
   ```

3. **Deploy CMS Package**
   ```bash
   cd packages/cms
   bun install
   bun build
   ```

### Phase 2: Marketing Application

1. **Set up Next.js Application**

   ```bash
   cd apps/marketing
   bun install
   bun dev
   ```

2. **Configure BaseHub Integration**
   - Set up content queries
   - Configure preview mode
   - Set up webhook endpoints

3. **Deploy Application**
   ```bash
   bun build
   bun start
   ```

### Phase 3: Content Management

1. **Create Content in BaseHub**
   - Create homepage with hero section
   - Add blog posts with authors
   - Set up navigation structure
   - Configure pricing page

2. **Configure Webhooks**
   - Set up webhook URL: `https://your-domain.com/api/webhook/basehub`
   - Configure events: content published, updated, deleted
   - Test webhook functionality

## Performance Optimization

### ISR Configuration

- Homepage: 1-hour revalidation
- Blog list: 30-minute revalidation
- Blog posts: 1-hour revalidation
- Cache tags for granular invalidation

### Image Optimization

- Next.js Image component for automatic optimization
- Responsive images with proper sizing
- Lazy loading for performance

### Bundle Optimization

- Code splitting for heavy components
- Tree shaking for unused code
- Server-side rendering for SEO

## SEO Implementation

### Dynamic Metadata

- Page-specific titles and descriptions
- OpenGraph tags for social sharing
- Twitter Card integration
- Canonical URLs for duplicate content prevention

### Structured Data

- Article schema for blog posts
- Organization schema for company info
- Breadcrumb schema for navigation
- JSON-LD format for search engines

### Sitemap Generation

- Dynamic sitemap.xml generation
- Automatic inclusion of new content
- Proper last-modified dates
- Priority and change frequency settings

## Security Considerations

### Authentication

- Server-only BaseHub token storage
- Preview token validation
- Webhook signature verification

### Content Security

- Input validation with Zod schemas
- Rich text sanitization
- Rate limiting for public endpoints
- CSP headers for XSS prevention

## Testing Strategy

### Unit Tests

- Content validation tests
- SEO service tests
- Component rendering tests
- Utility function tests

### Integration Tests

- CMS content fetching tests
- Webhook handling tests
- Preview mode tests
- SEO metadata tests

### E2E Tests

- Homepage functionality
- Blog navigation
- Contact form submission
- Newsletter signup

## Deployment Checklist

### Pre-deployment

- [ ] Environment variables configured
- [ ] BaseHub content created
- [ ] Webhooks configured
- [ ] Tests passing
- [ ] Performance optimized
- [ ] Security reviewed

### Production Deployment

- [ ] Domain configured
- [ ] SSL certificates installed
- [ ] CDN configured for images
- [ ] Analytics tracking enabled
- [ ] Error monitoring set up
- [ ] Backup strategy implemented

### Post-deployment

- [ ] Content updates tested
- [ ] Webhook functionality verified
- [ ] Performance monitoring active
- [ ] SEO validation completed
- [ ] Analytics data tracking
- [ ] User feedback collected

## Monitoring and Maintenance

### Performance Monitoring

- Core Web Vitals tracking
- Page load time monitoring
- Error rate monitoring
- Uptime monitoring

### Content Management

- Regular content audits
- SEO performance reviews
- User engagement analysis
- Content freshness checks

### Security Monitoring

- Vulnerability scanning
- Dependency updates
- Access log monitoring
- Security patch management

## Troubleshooting

### Common Issues

1. **Content not updating**: Check webhook configuration and cache invalidation
2. **Preview mode not working**: Verify preview token and draft mode settings
3. **Images not loading**: Check BaseHub image URLs and Next.js image configuration
4. **SEO metadata missing**: Verify content schema and metadata generation

### Debug Tools

- BaseHub GraphQL Explorer
- Next.js development tools
- Browser developer tools
- Server logs and error tracking

## Support and Resources

### Documentation

- BaseHub documentation: https://basehub.com/docs
- Next.js documentation: https://nextjs.org/docs
- Feature-Sliced Design: https://feature-sliced.design/

### Community

- BaseHub community support
- Next.js community forums
- Feature-Sliced Design community

### Internal Resources

- Code review guidelines
- Deployment procedures
- Content management guidelines
- Performance optimization best practices

## Future Enhancements

### Planned Features

- Multi-language support
- Advanced analytics integration
- A/B testing framework
- Marketing automation workflows
- Advanced personalization
- Mobile app integration

### Scalability Improvements

- Database optimization
- CDN integration
- Microservices architecture
- Advanced caching strategies
- Load balancing configuration

This implementation guide provides a comprehensive foundation for building and maintaining the SBA Marketing CMS and application. Follow these guidelines to ensure a successful deployment and ongoing operation.
