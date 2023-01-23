import {Endpoints} from "./types";
const baseUrl: string = "https://api.sl.se/api2/LineData.json";
const apiKey: string = "6af8acadd34c4cbbb0a35f575c0a20fe";
const slApiCache = "'sl-api-cache'";

const cacheOptions = {
	ignoreVary: true, // ignore differences in Headers
	ignoreMethod: true, // ignore differences in HTTP methods
	ignoreSearch: false, // ignore differences in query strings
};

export const endPoints: Endpoints = {
	JourneyPattern: "JourneyPattern",
	StopPoint: "StopPoint",
	Site: "Site",
};

function checkLatestCacheDate() {
	const lastFetchDate = localStorage.getItem("lastFetchDate") ?? "0";
	const twentyFiveHours = 1000 * 60 * 60 * 25;
	const deleteCacheAfter25Hours = Date.now() - parseInt(lastFetchDate) > twentyFiveHours;

	if (deleteCacheAfter25Hours) {
		window.caches.delete(slApiCache);
	}
}

async function cacheResponse(apiCache: Cache, request: string) {
	const response = await apiCache.match(request, cacheOptions).then((res) => res?.json());

	if (response) {
		return response;
	}
}

export async function fetchData(endpoint: string) {
	const request = `${baseUrl}?model=${endpoint}&key=${apiKey}`;
	checkLatestCacheDate();
	const apiCache = await caches.open(slApiCache);
	const cachedResponse = await cacheResponse(apiCache, request);
	if (cachedResponse) {
		return cachedResponse;
	}

	return fetch(request, {
		mode: "cors",
		headers: {
			"Accept-Encoding": "gzip, deflate",
		},
	}).then((response) => {
		// add request to cache, it is very big and slow. We can also only call the api 5 times per minute, and data is the same for 24 hours
		localStorage.setItem("lastFetchDate", JSON.stringify(Date.now()));
		apiCache.add(request);
		return response.json();
	});
}
