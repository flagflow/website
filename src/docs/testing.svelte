<script lang="ts">
	import CodeBlock from '$components/CodeBlock.svelte';
	import DocsPage from '$components/docs/DocsPage.svelte';
	import DocsPageRoundedBox from '$components/docs/DocsPageRoundedBox.svelte';
	import DocsPageSection from '$components/docs/DocsPageSection.svelte';
	import PageTitle from '$components/docs/DocsPageTitle.svelte';
</script>

<DocsPage>
	<PageTitle title="Testing Overview">
		Comprehensive testing infrastructure for reliable FlagFlow development
	</PageTitle>

	<DocsPageSection id="overview" title="Overview">
		<p class="mb-4">
			FlagFlow includes a comprehensive testing infrastructure built on modern testing frameworks
			and tools. The testing system supports unit testing, integration testing, and end-to-end
			testing with isolated state management and in-memory mocking capabilities.
		</p>
		<div class="mb-4 rounded-lg bg-blue-50 p-4">
			<p class="text-blue-800">
				<strong>Testing Philosophy:</strong> FlagFlow's testing infrastructure emphasizes test isolation,
				comprehensive coverage, and developer-friendly testing utilities for reliable development workflows.
			</p>
		</div>
	</DocsPageSection>

	<DocsPageSection id="testing-stack" title="Testing Stack">
		<div class="grid gap-6 md:grid-cols-2">
			<DocsPageRoundedBox>
				<h3 class="mb-3 text-lg font-semibold">Unit Testing</h3>
				<ul class="list-inside list-disc space-y-2 text-sm">
					<li><strong>Vitest</strong> - Fast, modern testing framework with TypeScript support</li>
					<li><strong>@testing-library/svelte</strong> - Component testing utilities for Svelte</li>
					<li><strong>jsdom</strong> - DOM environment for headless testing</li>
					<li>
						<strong>Coverage reporting</strong> - Built-in code coverage with detailed reports
					</li>
				</ul>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h3 class="mb-3 text-lg font-semibold">Integration & E2E Testing</h3>
				<ul class="list-inside list-disc space-y-2 text-sm">
					<li><strong>In-memory mocks</strong> - RPC testing with MockPersistentService</li>
					<li><strong>InMemoryPersistentEngine</strong> - Isolated state for test reliability</li>
					<li><strong>Real-time testing</strong> - Flag watching in test environments</li>
					<li><strong>Service isolation</strong> - Complete service layer testing</li>
				</ul>
			</DocsPageRoundedBox>
		</div>
	</DocsPageSection>

	<DocsPageSection id="test-architecture" title="Test Architecture">
		<p class="mb-4">
			The testing architecture provides multiple levels of testing with proper isolation and
			mocking:
		</p>
		<CodeBlock
			code={`// Test setup with isolated environment
import { beforeEach, afterEach, describe, it, expect } from 'vitest';
import { render, cleanup } from '@testing-library/svelte';
import { MockPersistentService } from './mocks/MockPersistentService';
import { InMemoryPersistentEngine } from './engines/InMemoryPersistentEngine';

describe('FlagFlow Component Tests', () => {
  let mockService: MockPersistentService;
  
  beforeEach(() => {
    // Create isolated test environment
    mockService = new MockPersistentService(
      new InMemoryPersistentEngine()
    );
    
    // Setup test data
    mockService.setFlags({
      'feature.enabled': true,
      'config.maxRetries': 5
    });
  });
  
  afterEach(() => {
    cleanup();
    mockService.reset();
  });
  
  it('should render flag-dependent component correctly', () => {
    const { getByTestId } = render(MyComponent, {
      props: { flagService: mockService }
    });
    
    expect(getByTestId('feature-content')).toBeInTheDocument();
  });
});`}
			title="Test Architecture Example"
		/>
	</DocsPageSection>

	<DocsPageSection id="test-isolation" title="Test Isolation">
		<p class="mb-4">
			FlagFlow's testing infrastructure provides complete test isolation through in-memory state
			management, ensuring tests are independent and reliable:
		</p>
		<div class="space-y-4">
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">InMemoryPersistentEngine</h4>
				<p class="mb-2 text-sm">
					Provides isolated, in-memory storage for each test run, eliminating cross-test
					contamination and external dependencies.
				</p>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Complete isolation between test runs</li>
					<li>No external database dependencies</li>
					<li>Fast setup and teardown</li>
					<li>Predictable test state</li>
				</ul>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">MockPersistentService</h4>
				<p class="mb-2 text-sm">
					Wraps the InMemoryPersistentEngine to provide a service-layer interface for testing with
					full API compatibility.
				</p>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Full service API compatibility</li>
					<li>Real-time flag watching support</li>
					<li>Audit logging in test mode</li>
					<li>Type-safe testing utilities</li>
				</ul>
			</DocsPageRoundedBox>
		</div>
	</DocsPageSection>

	<DocsPageSection id="running-tests" title="Running Tests">
		<p class="mb-4">FlagFlow provides several commands for running different types of tests:</p>
		<CodeBlock
			code={`# Run all tests
npm test

# Run tests with UI interface
npm run test:ui

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode (development)
npm run test:watch

# Run specific test file
npm test -- flag-service.test.ts

# Run tests matching pattern
npm test -- --grep="flag validation"`}
			title="Test Commands"
		/>
	</DocsPageSection>

	<DocsPageSection id="test-configuration" title="Test Configuration">
		<p class="mb-4">
			Tests are configured through <code>vitest.config.ts</code> with optimized settings for FlagFlow
			development:
		</p>
		<CodeBlock
			code={`// vitest.config.ts
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    environment: 'jsdom',
    setupFiles: ['tests/setup.ts'],
    coverage: {
      reporter: ['text', 'html', 'json'],
      exclude: [
        'node_modules/**',
        'tests/**',
        '**/*.d.ts',
        'build/**'
      ]
    },
    globals: true,
    alias: {
      '$lib': './src/lib',
      '$components': './src/components'
    }
  }
});`}
			title="Vitest Configuration"
		/>
	</DocsPageSection>

	<DocsPageSection id="best-practices" title="Testing Best Practices">
		<div class="space-y-4">
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">Test Organization</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Group related tests in describe blocks</li>
					<li>Use descriptive test names that explain the expected behavior</li>
					<li>Keep tests focused on single behaviors</li>
					<li>Use setup and teardown hooks for common test preparation</li>
				</ul>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">Isolation & Mocking</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Always use MockPersistentService for service-layer testing</li>
					<li>Reset mock state between tests</li>
					<li>Avoid real external dependencies in tests</li>
					<li>Use InMemoryPersistentEngine for predictable state</li>
				</ul>
			</DocsPageRoundedBox>
			<DocsPageRoundedBox>
				<h4 class="mb-2 font-semibold">Coverage & Quality</h4>
				<ul class="list-inside list-disc space-y-1 text-sm">
					<li>Aim for comprehensive test coverage of critical paths</li>
					<li>Test both success and error scenarios</li>
					<li>Include edge cases and boundary conditions</li>
					<li>Use coverage reports to identify untested code</li>
				</ul>
			</DocsPageRoundedBox>
		</div>
	</DocsPageSection>
</DocsPage>
