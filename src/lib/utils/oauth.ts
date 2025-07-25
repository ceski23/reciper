export const randomBytes = (size: number) => crypto.getRandomValues(new Uint8Array(size))

export const base64url = (bytes: Uint8Array) =>
	btoa(String.fromCharCode(...bytes))
		.replace(/=/g, '')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')

export const generateCodeChallenge = async (code_verifier: string) => {
	const codeVerifierBytes = new TextEncoder().encode(code_verifier)
	const hashBuffer = await crypto.subtle.digest('SHA-256', codeVerifierBytes)

	return base64url(new Uint8Array(hashBuffer))
}
