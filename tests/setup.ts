// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: (query: string) => ({
		matches: false,
		media: query,
		onchange: undefined,
		addListener: () => {},
		removeListener: () => {},
		addEventListener: () => {},
		removeEventListener: () => {},
		dispatchEvent: () => {}
	})
});

// Mock window.location
Object.defineProperty(window, 'location', {
	writable: true,
	value: {
		origin: 'http://localhost:3000'
	}
});
