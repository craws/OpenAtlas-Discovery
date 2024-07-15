import type { RouteLocationNormalized } from "vue-router";

function track(url: string, referrer: string, title: string) {
	window._paq?.push(["setReferrerUrl", referrer]);
	window._paq?.push(["setCustomUrl", url]);
	window._paq?.push(["setDocumentTitle", title]);
	window._paq?.push(["trackPageView"]);
	window._paq?.push(["enableLinkTracking"]);
}

export function trackPageView(to: RouteLocationNormalized, from: RouteLocationNormalized): void {
	const url = to.fullPath;
	const referrer = from.fullPath;

	if (typeof to.meta.title === "string") {
		track(url, referrer, to.meta.title);
	} else {
		/** Wait for `document.title` to be updated. */
		setTimeout(() => {
			track(url, referrer, document.title);
		}, 500);
	}
}

declare global {
	interface Window {
		_paq?: Array<unknown>;
	}
}

export function createAnalyticsScript(baseUrl: string, id: string): string {
	return `
  var _paq = (window._paq = window._paq || [])
  _paq.push(['disableCookies'])
  _paq.push(['enableHeartBeatTimer'])
  ;(function () {
    var u = '${baseUrl}'
    _paq.push(['setTrackerUrl', u + 'matomo.php'])
    _paq.push(['setSiteId', '${id}'])
    var d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0]
    g.async = true
    g.src = u + 'matomo.js'
    s.parentNode.insertBefore(g, s)
  })()`;
}
