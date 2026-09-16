window.__ModuleLoader__.load({
	id: "dsh-nico-theme",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		let _deepseek_ai_dsh_client_store = require("@deepseek-ai/dsh-client-store");
		let react_dom = require("react-dom");
		let react_dom_client = require("react-dom/client");
		//#region \0dsh-css:H:\WorkProj\dsh-nico-theme\src\client\AquaPluginCard.module.css.mjs
		const css$5 = ".ilwKzW_card{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:12px;flex-direction:column;padding:16px;display:flex}.ilwKzW_head{justify-content:space-between;align-items:center;gap:16px;display:flex}.ilwKzW_text{flex-direction:column;gap:2px;min-width:0;display:flex}.ilwKzW_title{color:var(--dsw-alias-label-primary);font-size:14px;font-weight:500;line-height:22px}.ilwKzW_description{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}.ilwKzW_toggle{border:1px solid var(--dsw-alias-border-l2);height:28px;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border-radius:14px;flex:none;align-items:center;gap:6px;padding:0 10px 0 6px;font-size:12px;line-height:18px;display:inline-flex}.ilwKzW_toggle:hover{background:var(--dsw-alias-interactive-bg-hover)}.ilwKzW_toggle[aria-pressed=true]{background:var(--dsw-alias-state-business-tertiary);color:var(--dsw-alias-state-business-primary);border-color:#0000}.ilwKzW_check{justify-content:center;align-items:center;width:16px;height:16px;display:inline-flex}";
		const tagId$5 = "dsh-nico-theme/AquaPluginCard.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$5) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-nico-theme";
			tag.dataset.pluginCss = tagId$5;
			tag.textContent = css$5;
			document.head.appendChild(tag);
		}
		var AquaPluginCard_module_css_default = {
			"card": "ilwKzW_card",
			"check": "ilwKzW_check",
			"description": "ilwKzW_description",
			"head": "ilwKzW_head",
			"text": "ilwKzW_text",
			"title": "ilwKzW_title",
			"toggle": "ilwKzW_toggle"
		};
		//#endregion
		//#region src/client/AquaPluginCard.tsx
		/**
		* Aqua card registered into the Plugins settings section's configurable tab
		* (`settings.plugin.item`): the master on/off switch — name, description, and
		* one toggle, in the section's card language. Every other knob lives in the
		* General settings' Appearance row, so the card stays the same shape as the
		* other plugin cards.
		*/
		/**
		* Render the Aqua plugin card.
		* @param props - composed slot props.
		* @returns the card list item.
		*/
		function AquaPluginCard(props) {
			const { t, setEnabled, useStore } = props;
			const enabled = useStore((s) => s.enabled);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("li", {
				className: AquaPluginCard_module_css_default.card,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: AquaPluginCard_module_css_default.head,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: AquaPluginCard_module_css_default.text,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: AquaPluginCard_module_css_default.title,
							children: t("aqua.title")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: AquaPluginCard_module_css_default.description,
							children: t("aqua.description")
						})]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						className: AquaPluginCard_module_css_default.toggle,
						"aria-pressed": enabled,
						onClick: () => {
							setEnabled(!enabled);
						},
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: AquaPluginCard_module_css_default.check,
							children: enabled && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCheckOutline16, {})
						}), enabled ? t("aqua.enable") : t("aqua.disable")]
					})]
				})
			});
		}
		//#endregion
		//#region node_modules/.pnpm/nico-glass-kit@0.3.0_react-_9ef2f8fbfb9e5f1cf891bd988d901caf/node_modules/nico-glass-kit/dist/nico-glass-kit.mjs
		const St = 24;
		const Bt = 32;
		const Se = .2;
		const It = .1;
		const Ct = .5;
		function Ve(t) {
			return t === void 0 || !Number.isFinite(t) ? Se : Math.min(Ct, Math.max(It, t));
		}
		const U = /* @__PURE__ */ new Map();
		const ie = {
			hits: 0,
			misses: 0,
			generated: 0,
			evictions: 0,
			size: 0
		};
		const ge = (t, e, n) => t < e ? e : t > n ? n : t;
		function V(t, e = 6) {
			const n = 10 ** e;
			return Math.round(t * n) / n;
		}
		function Xe(t) {
			const e = Math.max(1, t.width), n = Math.max(1, t.height), r = ge(t.quality ?? t.dpr ?? 1, .25, 4), s = Math.max(1, Math.round(e * r)), i = Math.max(1, Math.round(n * r)), o = Math.min(s, i) / 2;
			return {
				width: e,
				height: n,
				quality: r,
				pixelWidth: s,
				pixelHeight: i,
				radius: ge(t.radius * r, 0, o),
				edge: Math.max(.5, t.edge * r),
				curvature: ge(t.curvature, 0, 1),
				strength: ge(t.strength, 0, 1),
				rasterScale: Ve(t.rasterScale)
			};
		}
		function ct(t) {
			const e = Xe(t);
			return [
				`${V(t.width)}x${V(t.height)}`,
				`@${V(e.quality, 3)}`,
				`r:${V(e.radius / e.quality, 3)}`,
				`e:${V(t.edge, 3)}`,
				`p:${V(e.curvature, 4)}`,
				`s:${V(e.strength, 4)}`,
				`q:${V(e.quality, 3)}`,
				`m:${V(e.rasterScale, 3)}`
			].join(":");
		}
		function Je(t) {
			return ge(128 + Math.round(t * 127), 1, 255);
		}
		function Et(t) {
			const { pixelWidth: n, pixelHeight: r, radius: s, edge: i, curvature: o } = Xe(t), a = new Uint8ClampedArray(n * r * 4), l = n / 2, d = r / 2, u = n / 2 - s, f = r / 2 - s, p = Math.ceil(n / 2), x = Math.ceil(r / 2), v = (b, h, y, g) => {
				const m = (h * n + b) * 4;
				a[m] = y, a[m + 1] = g, a[m + 2] = 128, a[m + 3] = 255;
			};
			for (let b = 0; b < x; b++) for (let h = 0; h < p; h++) {
				const y = h + .5, g = b + .5, m = Math.abs(y - l) - u, N = Math.abs(g - d) - f, k = Math.max(m, 0), L = Math.max(N, 0), F = Math.hypot(k, L) + Math.min(Math.max(m, N), 0) - s;
				let E = 0, C = 0;
				if (k > 0 || L > 0) {
					const Be = Math.hypot(k, L) || 1;
					E = (y < l ? -k : k) / Be, C = (g < d ? -L : L) / Be;
				} else m > N ? E = y < l ? -1 : 1 : C = g < d ? -1 : 1;
				const B = 1 - ge(-F / i, 0, 1), q = B * B, ne = B * B * B * B, K = q + (1 - Math.sqrt(Math.sqrt(Math.max(0, 1 - ne))) - q) * o, le = -E * K, ce = -C * K, w = Je(le), I = Je(ce);
				v(h, b, w, I);
				const $ = n - 1 - h, W = r - 1 - b;
				$ !== h && v($, b, 256 - w, I), W !== b && v(h, W, w, 256 - I), $ !== h && W !== b && v($, W, 256 - w, 256 - I);
			}
			return a;
		}
		function _t(t, e, n = Se) {
			const r = Ve(n);
			return {
				width: Math.max(1, Math.round(t * r)),
				height: Math.max(1, Math.round(e * r))
			};
		}
		function Tt(t, e, n, r = Se) {
			try {
				if (typeof document < "u") {
					const s = document.createElement("canvas");
					s.width = e, s.height = n;
					const i = s.getContext("2d");
					if (!i) return "";
					i.putImageData(new ImageData(t, e, n), 0, 0);
					const o = _t(e, n, r);
					if (o.width === e && o.height === n) return s.toDataURL("image/png");
					const a = document.createElement("canvas");
					a.width = o.width, a.height = o.height;
					const l = a.getContext("2d");
					return l ? (l.imageSmoothingEnabled = !0, l.imageSmoothingQuality = "high", l.drawImage(s, 0, 0, o.width, o.height), a.toDataURL("image/png")) : "";
				}
			} catch {
				return "";
			}
			return "";
		}
		function Pt(t) {
			const e = ct(t), n = U.get(e);
			if (n) return ie.hits++, U.delete(e), U.set(e, n), n;
			ie.misses++;
			const r = Xe(t), s = Et(t), i = t.skipDataUrl ? "" : Tt(s, r.pixelWidth, r.pixelHeight, r.rasterScale), o = {
				cacheKey: e,
				width: r.width,
				height: r.height,
				pixelWidth: r.pixelWidth,
				pixelHeight: r.pixelHeight,
				quality: r.quality,
				rasterScale: r.rasterScale,
				maxScale: r.strength * St * (255 / 127),
				pixels: s,
				dataUrl: i
			};
			if (ie.generated++, U.set(e, o), U.size > Bt) {
				const a = U.keys().next().value;
				a !== void 0 && (U.delete(a), ie.evictions++);
			}
			return ie.size = U.size, o;
		}
		const et = "sRGB";
		const At = .2;
		function Ft(t) {
			return t < 0 ? 0 : t > 1 ? 1 : t;
		}
		function J(t) {
			return Math.round(t * 1e6) / 1e6;
		}
		function $t(t) {
			const e = Ft(t.dispersion ?? 0), n = Math.max(0, t.width), r = Math.max(0, t.height), s = t.scale, i = Math.max(0, t.blur ?? 0), o = t.saturation ?? 100, a = t.brightness ?? 1, l = t.animateBrightness ?? !1, d = [];
			let u = "SourceGraphic";
			if (i > 0 && (d.push({
				type: "blur",
				input: u,
				sigma: J(i / 2),
				result: "ngs_blur"
			}), u = "ngs_blur"), o !== 100 && (d.push({
				type: "saturate",
				input: u,
				amount: o / 100,
				result: "ngs_sat"
			}), u = "ngs_sat"), (a !== 1 || l) && (d.push({
				type: "brightness",
				input: u,
				amount: a,
				result: "ngs_bright"
			}), u = "ngs_bright"), e <= 0) d.push({
				type: "displacement",
				input: u,
				map: "map",
				scale: s
			});
			else {
				const p = s * e * At;
				d.push({
					type: "displacement",
					input: u,
					map: "map",
					scale: J(s + p),
					result: "ngs_disp_r"
				}, {
					type: "displacement",
					input: u,
					map: "map",
					scale: s,
					result: "ngs_disp_g"
				}, {
					type: "displacement",
					input: u,
					map: "map",
					scale: J(Math.max(0, s - p)),
					result: "ngs_disp_b"
				}, {
					type: "channel",
					input: "ngs_disp_r",
					channel: "r",
					result: "ngs_ch_r"
				}, {
					type: "channel",
					input: "ngs_disp_g",
					channel: "g",
					result: "ngs_ch_g"
				}, {
					type: "channel",
					input: "ngs_disp_b",
					channel: "b",
					result: "ngs_ch_b"
				}, {
					type: "blend",
					input: "ngs_ch_r",
					input2: "ngs_ch_g",
					mode: "screen",
					result: "ngs_ch_rg"
				}, {
					type: "blend",
					input: "ngs_ch_rg",
					input2: "ngs_ch_b",
					mode: "screen"
				});
			}
			const f = t.regionPaddingPx ?? Math.ceil(Math.max(i * 1.5, 4) + 2);
			return {
				mapUrl: t.mapUrl,
				width: n,
				height: r,
				scale: s,
				blur: i,
				saturation: o,
				brightness: a,
				dispersion: e,
				regionPaddingPx: f,
				passes: d
			};
		}
		function Gt(t) {
			return t === "r" ? "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0 1" : t === "g" ? "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 0 1" : "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 0 1";
		}
		function Ot(t) {
			const e = Math.max(0, t), n = .213, r = .715, s = .072;
			return [
				n + .787 * e,
				r - r * e,
				s - s * e,
				0,
				0,
				n - n * e,
				r + .28500000000000003 * e,
				s - s * e,
				0,
				0,
				n - n * e,
				r - r * e,
				s + .928 * e,
				0,
				0,
				0,
				0,
				0,
				1,
				0
			].map((o) => J(o)).join(" ");
		}
		function qt(t, e, n) {
			const r = Math.max(1, t), s = Math.max(1, e);
			return {
				x: `${J(-n / r * 100)}%`,
				y: `${J(-n / s * 100)}%`,
				width: `${J((1 + n * 2 / r) * 100)}%`,
				height: `${J((1 + n * 2 / s) * 100)}%`
			};
		}
		function zt(t, e) {
			return e <= 0 ? [] : t.flatMap((n) => n.type !== "displacement" ? [] : [n.scale / e]);
		}
		const ut = (0, react.createContext)(null);
		function Dt({ children: t }) {
			const e = (0, react.useId)().replace(/[^a-zA-Z0-9_-]/g, ""), [n, r] = (0, react.useState)(/* @__PURE__ */ new Map()), s = (0, react.useRef)(/* @__PURE__ */ new Map()), i = (0, react.useRef)(/* @__PURE__ */ new Map()), o = (h) => {
				let y = i.current.get(h);
				return y || (y = {
					scale: /* @__PURE__ */ new Map(),
					brightnessR: null,
					brightnessG: null,
					brightnessB: null
				}, i.current.set(h, y)), y;
			}, a = (0, react.useCallback)((h) => {
				let y = 5381;
				for (let g = 0; g < h.length; g++) y = (y << 5) + y + h.charCodeAt(g) | 0;
				return `ngs${e}-${(y >>> 0).toString(36)}`;
			}, [e]), l = (0, react.useCallback)((h) => {
				const y = a(h.key);
				return s.current.set(y, h.key), r((g) => {
					const m = new Map(g), N = m.get(h.key);
					if (N) m.set(h.key, {
						...N,
						count: N.count + 1
					});
					else {
						const k = $t({
							mapUrl: h.mapUrl,
							width: h.width,
							height: h.height,
							scale: h.scale,
							blur: h.blur,
							saturation: h.saturation,
							brightness: h.brightness,
							animateBrightness: h.animateBrightness,
							dispersion: h.dispersion
						});
						m.set(h.key, {
							id: y,
							mapUrl: h.mapUrl,
							width: h.width,
							height: h.height,
							passes: k.passes,
							ratios: zt(k.passes, h.scale),
							region: qt(h.width, h.height, k.regionPaddingPx),
							count: 1
						});
					}
					return m;
				}), y;
			}, [a]), d = (0, react.useCallback)((h) => {
				const y = s.current.get(h);
				y && r((g) => {
					const m = g.get(y);
					if (!m) return g;
					const N = new Map(g);
					return m.count <= 1 ? (N.delete(y), s.current.delete(h)) : N.set(y, {
						...m,
						count: m.count - 1
					}), N;
				});
			}, []), u = (0, react.useCallback)((h, y) => {
				const g = i.current.get(h);
				if (g) for (const { node: m, ratio: N } of g.scale.values()) m.setAttribute("scale", String(Math.max(0, y * N)));
			}, []), f = (0, react.useCallback)((h, y) => {
				var N, k, L;
				const g = i.current.get(h);
				if (!g) return;
				const m = String(Math.max(0, y));
				(N = g.brightnessR) == null || N.setAttribute("slope", m), (k = g.brightnessG) == null || k.setAttribute("slope", m), (L = g.brightnessB) == null || L.setAttribute("slope", m);
			}, []), p = (0, react.useMemo)(() => ({
				acquire: l,
				release: d,
				setScale: u,
				setBrightness: f
			}), [
				l,
				d,
				u,
				f
			]), x = (h, y, g) => (m) => {
				var N;
				m ? o(h).scale.set(y, {
					node: m,
					ratio: g
				}) : (N = i.current.get(h)) == null || N.scale.delete(y);
			}, v = (h, y) => (g) => {
				const m = g ? o(h) : i.current.get(h);
				m && (y === "r" ? m.brightnessR = g : y === "g" ? m.brightnessG = g : m.brightnessB = g);
			}, b = (h, y, g, m, N) => {
				switch (g.type) {
					case "displacement": {
						const k = N();
						return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("feDisplacementMap", {
							ref: x(h, k, y[k] ?? 1),
							in: g.input,
							in2: g.map,
							scale: g.scale,
							xChannelSelector: "R",
							yChannelSelector: "G",
							result: g.result
						}, m);
					}
					case "channel": return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("feColorMatrix", {
						in: g.input,
						type: "matrix",
						values: Gt(g.channel),
						result: g.result
					}, m);
					case "blend": return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("feBlend", {
						in: g.input,
						in2: g.input2,
						mode: g.mode,
						result: g.result
					}, m);
					case "blur": return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("feGaussianBlur", {
						in: g.input,
						stdDeviation: g.sigma,
						result: g.result
					}, m);
					case "saturate": return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("feColorMatrix", {
						in: g.input,
						type: "matrix",
						values: Ot(g.amount),
						result: g.result
					}, m);
					case "brightness": return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("feComponentTransfer", {
						in: g.input,
						result: g.result,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("feFuncR", {
								type: "linear",
								slope: g.amount,
								intercept: 0,
								ref: v(h, "r")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("feFuncG", {
								type: "linear",
								slope: g.amount,
								intercept: 0,
								ref: v(h, "g")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("feFuncB", {
								type: "linear",
								slope: g.amount,
								intercept: 0,
								ref: v(h, "b")
							})
						]
					}, m);
				}
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(ut.Provider, {
				value: p,
				children: [t, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
					"aria-hidden": "true",
					focusable: "false",
					"data-ngs-internal": "all",
					style: {
						position: "absolute",
						width: 0,
						height: 0,
						overflow: "hidden"
					},
					colorInterpolationFilters: et,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("defs", { children: [...n.values()].map(({ id: h, mapUrl: y, width: g, height: m, passes: N, ratios: k, region: L }) => {
						let F = 0;
						const E = () => F++;
						return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("filter", {
							id: h,
							x: L.x,
							y: L.y,
							width: L.width,
							height: L.height,
							colorInterpolationFilters: et,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("feImage", {
								href: y,
								x: "0",
								y: "0",
								width: g,
								height: m,
								preserveAspectRatio: "none",
								result: "map"
							}), N.map((C, O) => b(h, k, C, O, E))]
						}, h);
					}) })
				})]
			});
		}
		function Wt(t) {
			const e = (0, react.useContext)(ut), n = (0, react.useId)(), [r, s] = (0, react.useState)(null), i = (0, react.useRef)(0), o = (0, react.useRef)(null);
			o.current = r;
			const { enabled: a, shared: l, map: d, blur: u, saturation: f, brightness: p, animateBrightness: x, dispersion: v } = t, { width: b, height: h, radius: y, edge: g, curvature: m, strength: N, dpr: k, rasterScale: L } = d;
			(0, react.useEffect)(() => {
				if (!e || !a || b < 2 || h < 2) {
					s(null);
					return;
				}
				let C = null;
				try {
					const O = Pt({
						width: b,
						height: h,
						radius: y,
						edge: g,
						curvature: m,
						strength: N,
						dpr: k,
						rasterScale: L
					});
					if (!O.dataUrl) throw new Error("nico-glass-kit: lens map rasterisation unavailable");
					const B = O.maxScale;
					i.current = B;
					const q = [
						ct({
							width: b,
							height: h,
							radius: y,
							edge: g,
							curvature: m,
							strength: N,
							dpr: k,
							rasterScale: L
						}),
						`b${u}`,
						`sat${f}`,
						`br${p}`,
						`ab${x ? 1 : 0}`,
						`x${v}`,
						`sc${Math.round(B * 100)}`,
						l ? "shared" : n
					].join("|");
					C = e.acquire({
						key: q,
						width: b,
						height: h,
						mapUrl: O.dataUrl,
						scale: B,
						blur: u,
						saturation: f,
						brightness: p,
						animateBrightness: x ?? !1,
						dispersion: v
					}), s(C);
				} catch {
					s(null);
					return;
				}
				return () => {
					C && e.release(C);
				};
			}, [
				e,
				a,
				l,
				b,
				h,
				y,
				g,
				m,
				N,
				k,
				L,
				u,
				f,
				p,
				x,
				v,
				n
			]);
			return {
				filterId: r,
				baseScaleRef: i,
				setFilterScale: (0, react.useCallback)((C) => {
					e && o.current && e.setScale(o.current, C);
				}, [e]),
				setFilterBrightness: (0, react.useCallback)((C) => {
					e && o.current && e.setBrightness(o.current, C);
				}, [e])
			};
		}
		const Oe = (0, react.createContext)({
			quality: "medium",
			overLight: "auto",
			lensMapRasterScale: Se
		});
		function dr({ quality: t = "medium", overLight: e = "auto", lensMapRasterScale: n = Se, children: r }) {
			const s = (0, react.useMemo)(() => ({
				quality: t,
				overLight: e,
				lensMapRasterScale: Ve(n)
			}), [
				t,
				e,
				n
			]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Oe.Provider, {
				value: s,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Dt, { children: r })
			});
		}
		let qe = null;
		let Ne = null;
		const dt = () => typeof window < "u" && typeof document < "u";
		function jt() {
			if (!dt()) return !1;
			if (qe !== null) return qe;
			const t = document.createElement("div");
			t.style.backdropFilter = "blur(2px)";
			let e = t.style.backdropFilter === "blur(2px)";
			if (!e) {
				const n = t.style;
				n.webkitBackdropFilter = "blur(2px)", e = n.webkitBackdropFilter === "blur(2px)";
			}
			return qe = e, e;
		}
		function Ht() {
			if (!dt()) return !1;
			if (Ne !== null) return Ne;
			const t = navigator.userAgent, e = /Firefox\//.test(t), n = /Safari\//.test(t) && !/Chrome\/|Chromium\/|Edg\/|OPR\//.test(t);
			if (e || n) return Ne = !1, !1;
			const r = document.createElement("div");
			return r.style.backdropFilter = "url(#ngs-supports-test)", Ne = /url\(/.test(r.style.backdropFilter), Ne;
		}
		function Ut(t) {
			const e = (0, react.useContext)(Oe), n = t ?? e.quality ?? "medium", [r, s] = (0, react.useState)("low");
			return (0, react.useEffect)(() => {
				let i = n;
				jt() ? i !== "low" && !Ht() && (i = "low") : i = "low", s(i);
			}, [n]), r;
		}
		const ze = .3;
		const nt = [
			.2,
			.5,
			.8
		];
		const Kt = 24;
		const Vt = /^#([\da-f]{3,8})$/i;
		const Xt = /^rgba?\(([^()]*)\)$/i;
		function Pe(t) {
			const e = t.trim().toLowerCase();
			if (!e) return null;
			if (e === "transparent") return {
				r: 0,
				g: 0,
				b: 0,
				a: 0
			};
			const n = Vt.exec(e);
			if (n) {
				const p = n[1];
				if (p.length === 3 || p.length === 4) {
					const x = [...p].map((v) => parseInt(v + v, 16));
					return {
						r: x[0],
						g: x[1],
						b: x[2],
						a: p.length === 4 ? x[3] / 255 : 1
					};
				}
				return p.length === 6 || p.length === 8 ? {
					r: parseInt(p.slice(0, 2), 16),
					g: parseInt(p.slice(2, 4), 16),
					b: parseInt(p.slice(4, 6), 16),
					a: p.length === 8 ? parseInt(p.slice(6, 8), 16) / 255 : 1
				} : null;
			}
			const r = Xt.exec(e);
			if (!r) return null;
			const s = ee(r[1], "/"), i = s[0], o = (i.includes(",") ? ee(i, ",") : ee(i, " ")).map((p) => p.trim()).filter(Boolean);
			if (o.length !== 3 && o.length !== 4) return null;
			const a = De(o[0]), l = De(o[1]), d = De(o[2]);
			if (a === null || l === null || d === null) return null;
			const u = s.length > 1 ? s[1] : o.length === 4 ? o[3] : null;
			let f = 1;
			if (u !== null) {
				const p = Yt(u.trim());
				if (p === null) return null;
				f = p;
			}
			return {
				r: a,
				g: l,
				b: d,
				a: f
			};
		}
		function De(t) {
			const e = t.trim();
			if (e.endsWith("%")) {
				const r = Number.parseFloat(e);
				return Number.isFinite(r) ? te(r * 2.55) : null;
			}
			const n = Number.parseFloat(e);
			return Number.isFinite(n) ? te(n) : null;
		}
		function Yt(t) {
			if (t.endsWith("%")) {
				const n = Number.parseFloat(t);
				return Number.isFinite(n) ? Ae(n / 100) : null;
			}
			const e = Number.parseFloat(t);
			return Number.isFinite(e) ? Ae(e) : null;
		}
		function Ce(t, e) {
			const n = t.a + e.a * (1 - t.a);
			if (n <= 0) return {
				r: 0,
				g: 0,
				b: 0,
				a: 0
			};
			const r = (s, i) => (s * t.a + i * e.a * (1 - t.a)) / n;
			return {
				r: te(r(t.r, e.r)),
				g: te(r(t.g, e.g)),
				b: te(r(t.b, e.b)),
				a: n
			};
		}
		function Qt(t) {
			const e = (n) => {
				const r = n / 255;
				return r <= .04045 ? r / 12.92 : Math.pow((r + .055) / 1.055, 2.4);
			};
			return .2126 * e(t.r) + .7152 * e(t.g) + .0722 * e(t.b);
		}
		function ht(t, e) {
			return e === !0 ? t > .27 : e === !1 ? t > .32999999999999996 : t > ze;
		}
		function en$1(t) {
			const e = t.trim(), n = e.toLowerCase();
			if (n.startsWith("linear-gradient(") && e.endsWith(")")) {
				const r = ee(e.slice(16, -1), ",").map((l) => l.trim()).filter(Boolean);
				if (r.length < 2) return null;
				let s = 180, i = r;
				const o = tn(r[0]);
				if (o !== null) s = o, i = r.slice(1);
				else if (!r[0].includes("%")) {
					const l = rn(r[0]);
					l !== null && (s = l, i = r.slice(1));
				}
				const a = st(i);
				return a ? {
					kind: "linear",
					angleDeg: s,
					stops: a
				} : null;
			}
			if (n.startsWith("radial-gradient(") && e.endsWith(")")) {
				const r = ee(e.slice(16, -1), ",").map((f) => f.trim()).filter(Boolean);
				if (r.length < 2) return null;
				let s = "ellipse", i = .5, o = .5, a = r;
				const l = r[0];
				if (/\b(circle|ellipse|closest-side|closest-corner|farthest-side|farthest-corner)\b/i.test(l) || /\bat\b/i.test(l)) {
					const f = /\bat\s+(.+)$/i.exec(l);
					if (f) {
						const p = sn(f[1]);
						p && (i = p.x, o = p.y);
					}
					/\bcircle\b/i.test(l) && (s = "circle"), a = r.slice(1);
				}
				const u = st(a);
				return u ? {
					kind: "radial",
					shape: s,
					cx: i,
					cy: o,
					stops: u
				} : null;
			}
			return null;
		}
		const We = {
			top: 0,
			right: 90,
			bottom: 180,
			left: 270
		};
		function tn(t) {
			var u;
			const e = /^to\s+([a-z]+)(?:\s+([a-z]+))?$/i.exec(t.trim());
			if (!e) return null;
			const n = e[1].toLowerCase(), r = ((u = e[2]) == null ? void 0 : u.toLowerCase()) ?? "", s = We[n];
			if (!r) return s ?? null;
			const i = n === "top" || n === "bottom" ? n : r, o = n === "left" || n === "right" ? n : r, a = We[i], l = We[o];
			return a === void 0 || l === void 0 ? null : a + (i === "top" == (o === "right") ? 45 : -45);
		}
		const nn = /^(-?[\d.]+)(deg|grad|rad|turn)?$/;
		function rn(t) {
			const e = nn.exec(t.trim());
			if (!e) return null;
			const n = Number.parseFloat(e[1]);
			if (!Number.isFinite(n)) return null;
			switch (e[2]) {
				case "grad": return n * .9;
				case "rad": return n * 180 / Math.PI;
				case "turn": return n * 360;
				default: return n;
			}
		}
		const rt = {
			left: 0,
			center: .5,
			right: 1,
			top: 0,
			bottom: 1
		};
		function je(t) {
			const e = t.trim().toLowerCase();
			if (e in rt) return rt[e];
			if (e.endsWith("%")) {
				const n = Number.parseFloat(e);
				return Number.isFinite(n) ? n / 100 : null;
			}
			return null;
		}
		function sn(t) {
			const e = ee(t, " ").map((i) => i.trim()).filter(Boolean);
			if (e.length === 0 || e.length > 2) return null;
			if (e.length === 1) {
				const i = je(e[0]);
				return i === null ? null : e[0] === "top" || e[0] === "bottom" ? {
					x: .5,
					y: i
				} : {
					x: i,
					y: .5
				};
			}
			const n = je(e[0]), r = je(e[1]);
			return n === null || r === null ? null : e[0] === "top" || e[0] === "bottom" ? {
				x: r,
				y: n
			} : {
				x: n,
				y: r
			};
		}
		function st(t) {
			const e = [];
			for (const n of t) {
				const r = on(n);
				if (!r) return null;
				e.push(...r);
			}
			return e.length ? (an(e), e) : null;
		}
		function on(t) {
			const e = Pe(t);
			if (e) return [{
				color: e,
				pos: null
			}];
			const n = ee(t, " ").map((i) => i.trim()).filter(Boolean);
			if (n.length < 2) return null;
			let r = null;
			const s = [];
			for (const i of n) {
				const o = Pe(i);
				if (o) {
					if (r) return null;
					r = o;
					continue;
				}
				const a = i.toLowerCase();
				if (a.endsWith("%")) {
					const l = Number.parseFloat(a);
					if (!Number.isFinite(l)) return null;
					s.push(Ae(l / 100));
					continue;
				}
				return null;
			}
			return !r || !s.length ? null : s.map((i) => ({
				color: r,
				pos: i
			}));
		}
		function an(t) {
			t[0].pos === null && (t[0].pos = 0);
			const e = t.length - 1;
			t[e].pos === null && (t[e].pos = 1);
			let n = 0;
			for (; n < t.length;) {
				if (t[n].pos !== null) {
					n++;
					continue;
				}
				const r = n;
				for (; t[n].pos === null;) n++;
				const s = t[r - 1].pos, i = t[n].pos, o = n - r + 1;
				for (let a = r; a < n; a++) t[a].pos = s + (i - s) * (a - r + 1) / o;
			}
		}
		function ln(t, e, n) {
			const r = t.stops;
			if (!r.length) return null;
			let s;
			if (t.kind === "linear") {
				const i = t.angleDeg * Math.PI / 180, o = Math.sin(i), a = -Math.cos(i), l = Math.abs(e.width * o) + Math.abs(e.height * a);
				l === 0 ? s = 0 : s = ((n.x - e.width / 2) * o + (n.y - e.height / 2) * a) / l + .5;
			} else {
				const i = t.cx * e.width, o = t.cy * e.height, a = Math.max(Math.abs(i), Math.abs(e.width - i)), l = Math.max(Math.abs(o), Math.abs(e.height - o));
				if (t.shape === "circle") {
					const d = Math.hypot(a, l);
					s = d === 0 ? 0 : Math.hypot(n.x - i, n.y - o) / d;
				} else {
					const d = Math.hypot(a, l * e.width / e.height), u = e.height === 0 ? 0 : d * e.height / e.width;
					s = d === 0 || u === 0 ? 0 : Math.hypot((n.x - i) / d, (n.y - o) / u);
				}
			}
			return cn(r, Ae(s));
		}
		function cn(t, e) {
			if (e <= t[0].pos) return t[0].color;
			const n = t[t.length - 1];
			if (e >= n.pos) return n.color;
			for (let r = 0; r < t.length - 1; r++) {
				const s = t[r], i = t[r + 1], o = s.pos, a = i.pos;
				if (e >= o && e <= a) {
					const l = a === o ? e >= a ? 1 : 0 : (e - o) / (a - o);
					return un(s.color, i.color, l);
				}
			}
			return n.color;
		}
		function un(t, e, n) {
			const r = t.a + (e.a - t.a) * n;
			if (r <= 0) return {
				r: 0,
				g: 0,
				b: 0,
				a: 0
			};
			const s = (i, o) => i * t.a + (o * e.a - i * t.a) * n;
			return {
				r: te(s(t.r, e.r) / r),
				g: te(s(t.g, e.g) / r),
				b: te(s(t.b, e.b) / r),
				a: r
			};
		}
		function dn(t, e) {
			let n = null;
			for (const r of t) {
				let s = r.backgroundColor;
				if (r.imageColor && r.imageColor.a > 0 && (s = s ? Ce(r.imageColor, s) : r.imageColor), r.gradient) {
					const i = ln(r.gradient, r.box, r.point);
					i && i.a > 0 && (s = s ? Ce(i, s) : i);
				}
				if (s && s.a > 0 && (n = n ? Ce(n, s) : s, n.a >= .999)) return n;
			}
			return n ? n.a >= .999 ? n : Ce(n, e) : e;
		}
		const hn = /* @__PURE__ */ new Set([
			"IFRAME",
			"FRAME",
			"OBJECT",
			"EMBED",
			"VIDEO",
			"CANVAS"
		]);
		let Ue = /* @__PURE__ */ new WeakMap();
		function gn() {
			Ue = /* @__PURE__ */ new WeakMap();
		}
		function fn(t, e) {
			let n = Ue.get(t);
			if (!n) {
				const r = xn(e.backgroundImage);
				n = {
					image: r,
					gradient: (r == null ? void 0 : r.kind) === "gradient" ? en$1(r.layer) : null,
					size: e.backgroundSize,
					position: e.backgroundPosition
				}, Ue.set(t, n);
			}
			return n;
		}
		function gt(t, e) {
			return {
				doc: t,
				win: e,
				fallback: wn(t),
				styles: /* @__PURE__ */ new Map(),
				rects: /* @__PURE__ */ new Map(),
				pendingImages: !1
			};
		}
		function mn(t, e, n, r, s) {
			const i = fn(e, n);
			let o = null;
			if (i.image && i.image.kind === "url") {
				const a = Ln(i.image.url);
				a === "pending" ? t.pendingImages = !0 : a !== "failed" && (o = i.size === "cover" && (i.position === "center" || i.position.includes("center") || i.position.includes("50%")) ? Rn(a.img, {
					width: r.width,
					height: r.height
				}, s) ?? a.average : a.average);
			}
			return {
				box: {
					width: r.width,
					height: r.height
				},
				point: s,
				backgroundColor: Pe(n.backgroundColor),
				gradient: i.gradient,
				imageColor: o
			};
		}
		function ft(t, e, n, r) {
			const s = [];
			for (const i of e) {
				if (n(i)) continue;
				if (hn.has(i.tagName)) return null;
				let o = t.styles.get(i);
				if (o || (o = t.win.getComputedStyle(i), t.styles.set(i, o)), o.visibility === "hidden" || o.display === "none") continue;
				let a = t.rects.get(i);
				if (a || (a = i.getBoundingClientRect(), t.rects.set(i, a)), s.push(mn(t, i, o, a, {
					x: r.x - a.left,
					y: r.y - a.top
				})), s.length >= Kt) break;
			}
			return s;
		}
		function mt(t, e, n) {
			const { win: r } = t, s = [];
			for (const i of nt) for (const o of nt) {
				const a = Math.min(Math.max(e.left + e.width * i, 0), r.innerWidth - 1), l = Math.min(Math.max(e.top + e.height * o, 0), r.innerHeight - 1), u = n(t.doc.elementsFromPoint(a, l), a, l);
				u && s.push(Qt(dn(u, t.fallback)));
			}
			return s;
		}
		function pt(t) {
			return t.reduce((e, n) => e + n, 0) / t.length;
		}
		function yn(t) {
			const e = t.ownerDocument, n = e.defaultView;
			if (!n || typeof e.elementsFromPoint != "function") return null;
			const r = t.getBoundingClientRect();
			if (r.width < 1 || r.height < 1 || r.bottom <= 0 || r.top >= n.innerHeight || r.right <= 0 || r.left >= n.innerWidth) return null;
			const i = gt(e, n), o = mt(i, r, (a, l, d) => {
				const u = a.indexOf(t), f = u >= 0 ? a.slice(u + 1) : a.filter((p) => p !== t && !t.contains(p));
				return ft(i, f, (p) => t.contains(p), {
					x: l,
					y: d
				});
			});
			return o.length ? {
				averageLuminance: pt(o),
				pendingImages: i.pendingImages
			} : {
				averageLuminance: null,
				pendingImages: i.pendingImages
			};
		}
		function wn(t) {
			const e = t.defaultView;
			if (e) for (const n of [t.body, t.documentElement]) {
				if (!n) continue;
				const r = Pe(e.getComputedStyle(n).backgroundColor);
				if (r && r.a >= .999) return r;
			}
			return {
				r: 255,
				g: 255,
				b: 255,
				a: 1
			};
		}
		function xn(t) {
			let e = t;
			if (e.length > 0 && (e.charCodeAt(0) <= 32 || e.charCodeAt(e.length - 1) <= 32) && (e = e.trim()), !e || e.length < 16 && e.toLowerCase() === "none") return null;
			if (e.slice(0, 4).toLowerCase() === "url(") {
				const s = Mn(e);
				if (s < 0) return null;
				const i = it(e.slice(0, s));
				return i ? {
					kind: "url",
					url: i
				} : null;
			}
			const n = ee(e, ",").map((s) => s.trim()).find(Boolean);
			if (!n) return null;
			const r = n.toLowerCase();
			if (r.startsWith("linear-gradient(") || r.startsWith("radial-gradient(")) return {
				kind: "gradient",
				layer: n
			};
			if (r.startsWith("url(")) {
				const s = it(n);
				return s ? {
					kind: "url",
					url: s
				} : null;
			}
			return null;
		}
		function Mn(t) {
			const e = t[4];
			if (e === "\"" || e === "'") {
				let r = 5;
				for (; r < t.length;) {
					const i = t[r];
					if (i === "\\") {
						r += 2;
						continue;
					}
					if (i === e) break;
					r++;
				}
				if (r >= t.length) return -1;
				let s = r + 1;
				for (; s < t.length && t[s] === " ";) s++;
				return t[s] === ")" ? s + 1 : -1;
			}
			const n = t.indexOf(")", 4);
			return n === -1 ? -1 : n + 1;
		}
		function it(t) {
			const e = t.indexOf("("), n = t.lastIndexOf(")");
			if (e < 0 || n <= e) return null;
			const r = t.slice(e + 1, n).trim(), s = r[0];
			return (s === "\"" || s === "'") && r.length >= 2 && r[r.length - 1] === s ? r.slice(1, -1) || null : r || null;
		}
		const Ee = /* @__PURE__ */ new Map();
		const Ke = /* @__PURE__ */ new Set();
		function Nn(t) {
			return Ke.add(t), () => {
				Ke.delete(t);
			};
		}
		function Ln(t) {
			const e = Ee.get(t);
			if (e) return e;
			if (typeof window > "u" || typeof Image > "u") return "failed";
			Ee.set(t, "pending");
			const n = new Image();
			return n.crossOrigin = "anonymous", n.onload = () => {
				const r = kn(n);
				Ee.set(t, r ? {
					img: n,
					average: r
				} : "failed"), ot();
			}, n.onerror = () => {
				Ee.set(t, "failed"), ot();
			}, n.src = t, "pending";
		}
		function ot() {
			for (const t of Ke) t();
		}
		let ue = null;
		let de = null;
		function bt(t) {
			if (typeof document > "u") return null;
			const e = document.createElement("canvas");
			return e.width = t, e.height = t, e.getContext("2d", { willReadFrequently: !0 });
		}
		function kn(t) {
			if (ue || (ue = bt(16)), !ue) return null;
			try {
				ue.clearRect(0, 0, 16, 16), ue.drawImage(t, 0, 0, 16, 16);
				const e = ue.getImageData(0, 0, 16, 16).data;
				let n = 0, r = 0, s = 0, i = 0;
				for (let o = 0; o < e.length; o += 4) e[o + 3] < 26 || (n += e[o], r += e[o + 1], s += e[o + 2], i++);
				return i ? {
					r: n / i,
					g: r / i,
					b: s / i,
					a: 1
				} : null;
			} catch {
				return null;
			}
		}
		function Rn(t, e, n) {
			const r = t.naturalWidth, s = t.naturalHeight;
			if (!r || !s) return null;
			const i = Math.max(e.width / r, e.height / s);
			if (!Number.isFinite(i) || i <= 0) return null;
			const o = (e.width - r * i) / 2, a = (e.height - s * i) / 2, l = Math.min(Math.max((n.x - o) / i, 0), r - 1), d = Math.min(Math.max((n.y - a) / i, 0), s - 1);
			if (de || (de = bt(1)), !de) return null;
			try {
				de.clearRect(0, 0, 1, 1), de.drawImage(t, Math.floor(l), Math.floor(d), 1, 1, 0, 0, 1, 1);
				const u = de.getImageData(0, 0, 1, 1).data;
				return {
					r: u[0],
					g: u[1],
					b: u[2],
					a: u[3] / 255
				};
			} catch {
				return null;
			}
		}
		function ee(t, e) {
			const n = [];
			let r = 0, s = "";
			for (const i of t) i === "(" ? r++ : i === ")" && r--, i === e && r === 0 ? (n.push(s), s = "") : s += i;
			return n.push(s), n;
		}
		function te(t) {
			return Math.min(255, Math.max(0, t));
		}
		function Ae(t) {
			return Math.min(1, Math.max(0, t));
		}
		const at = 120;
		const Sn = 6;
		const lt = "data-ngs-internal";
		const Bn = 260;
		function In(t) {
			const e = t.target;
			if (!e || typeof e.closest != "function") return !1;
			const n = e.closest(`[${lt}]`);
			return !n || typeof n.getAttribute != "function" ? !1 : n.getAttribute(lt) === "all" ? !0 : t.type === "attributes" && t.attributeName === "style";
		}
		function Cn(t) {
			return t.type === "attributes" && t.attributeName === "data-ngs-light";
		}
		const he = 1;
		function En(t) {
			const { rect: e, last: n, offsets: r, intersects: s } = t;
			let i = !1;
			for (const [o, a] of r) {
				const l = n == null ? void 0 : n.offsets.get(o);
				if (!l) {
					s(o) && (i = !0);
					continue;
				}
				const d = a.top - l.top, u = a.left - l.left;
				if (Math.abs(d) < .5 && Math.abs(u) < .5) continue;
				const f = n == null ? void 0 : n.rect;
				if (!f) continue;
				const p = Math.abs(e.width - f.width) < he && Math.abs(e.height - f.height) < he;
				p && Math.abs(e.top - f.top - d) < he && Math.abs(e.left - f.left - u) < he || p && Math.abs(e.top - f.top) < he && Math.abs(e.left - f.left) < he && !s(o) || (i = !0);
			}
			return i;
		}
		const Y = /* @__PURE__ */ new Map();
		const Ye = /* @__PURE__ */ new Set();
		let Fe = !1;
		let pe = 0;
		let oe = 0;
		let fe = null;
		let Le = null;
		const $e = () => performance.now();
		function _n() {
			Fe || typeof window > "u" || (Fe = !0, window.addEventListener("scroll", yt, {
				capture: !0,
				passive: !0
			}), window.addEventListener("resize", ae), document.addEventListener("visibilitychange", ae), fe = new MutationObserver(Pn), fe.observe(document.documentElement, {
				attributes: !0,
				childList: !0,
				subtree: !0
			}), Le = Nn(ae));
		}
		function Tn() {
			Fe && (Fe = !1, window.removeEventListener("scroll", yt, { capture: !0 }), window.removeEventListener("resize", ae), document.removeEventListener("visibilitychange", ae), fe?.disconnect(), fe = null, Le?.(), Le = null, pe && (cancelAnimationFrame(pe), pe = 0), oe && (window.clearTimeout(oe), oe = 0), Ye.clear());
		}
		function yt(t) {
			Ye.add(t.target);
			for (const e of Y.values()) e.scrollPending = !0;
			be();
		}
		function ae() {
			gn();
			for (const t of Y.values()) t.needsRun = !0;
			be();
		}
		function Pn(t) {
			if (!t.every(In)) {
				if (t.some(Cn)) {
					An();
					return;
				}
				ae();
			}
		}
		function An() {
			typeof window > "u" || (oe && window.clearTimeout(oe), oe = window.setTimeout(() => {
				oe = 0, ae();
			}, Bn));
		}
		function be() {
			pe || typeof requestAnimationFrame > "u" || (pe = requestAnimationFrame($n));
		}
		function Fn() {
			for (const t of Y.values()) if (t.scrollPending || t.needsRun && t.trailing === void 0) return !0;
			return !1;
		}
		function $n() {
			pe = 0;
			const t = $e();
			for (const e of [...Y.values()]) if (!(!e.needsRun && !e.scrollPending)) {
				if ($e() - t > Sn) break;
				e.scrollPending && zn(e), e.needsRun && Gn(e);
			}
			Fn() && be();
		}
		function Gn(t) {
			const e = $e() - t.lastRunAt;
			if (e >= at) {
				t.lastRunAt = $e(), t.needsRun = !1, t.target.run(), Mt(t);
				return;
			}
			t.trailing === void 0 && (t.trailing = window.setTimeout(() => {
				t.trailing = void 0, be();
			}, at - e));
		}
		function vt() {
			const t = /* @__PURE__ */ new Map();
			t.set(document, {
				top: window.scrollY,
				left: window.scrollX
			});
			for (const e of Ye) e === document || !(e instanceof Element) || t.set(e, {
				top: e.scrollTop,
				left: e.scrollLeft
			});
			return t;
		}
		function wt(t, e) {
			const n = new Map((t == null ? void 0 : t.offsets) ?? []);
			for (const [r, s] of e) n.set(r, s);
			return n;
		}
		function On(t, e) {
			const n = e.top + e.height, r = e.left + e.width;
			if (t === document) return n > 0 && e.top < window.innerHeight && r > 0 && e.left < window.innerWidth;
			if (!(t instanceof Element)) return !1;
			const s = t.getBoundingClientRect();
			return n > s.top && e.top < s.bottom && r > s.left && e.left < s.right;
		}
		function qn(t) {
			const e = t.getBoundingClientRect();
			return {
				top: e.top,
				left: e.left,
				width: e.width,
				height: e.height
			};
		}
		function xt(t) {
			if (t.target.region) return t.target.region();
			const e = t.target.el;
			return !e || !e.isConnected ? null : qn(e);
		}
		function zn(t) {
			t.scrollPending = !1;
			const e = xt(t);
			if (!e) return;
			const n = wt(t.lastCheck, vt()), r = t.lastCheck;
			t.lastCheck = {
				rect: e,
				offsets: n
			}, !t.needsRun && En({
				rect: e,
				last: r,
				offsets: n,
				intersects: (s) => On(s, e)
			}) && (t.needsRun = !0);
		}
		function Mt(t) {
			const e = xt(t);
			if (!e) {
				t.lastCheck = null;
				return;
			}
			t.lastCheck = {
				rect: e,
				offsets: wt(t.lastCheck, vt())
			};
		}
		function Nt(t) {
			const e = {
				target: t,
				needsRun: !0,
				scrollPending: !1,
				lastRunAt: 0,
				trailing: void 0,
				lastCheck: null
			};
			return Y.set(t, e), _n(), Mt(e), be(), () => {
				const n = Y.get(t);
				n && (n.trailing !== void 0 && window.clearTimeout(n.trailing), Y.delete(t), Y.size === 0 && Tn());
			};
		}
		function ke(t) {
			const e = Y.get(t);
			e && (e.needsRun = !0, be());
		}
		const Lt = (0, react.createContext)(null);
		const kt = (0, react.createContext)(null);
		function Un(t, e) {
			const [n, r] = (0, react.useState)(null), s = (0, react.useRef)(null);
			return (0, react.useEffect)(() => {
				if (!e) {
					s.current = null, r(null);
					return;
				}
				const i = {
					get el() {
						return (t == null ? void 0 : t.current) ?? null;
					},
					run: () => {
						const d = t == null ? void 0 : t.current;
						if (!d || !d.isConnected || document.hidden) return;
						const u = yn(d);
						if (!u) return;
						if (u.averageLuminance === null) {
							s.current !== null && (s.current = null, r(null));
							return;
						}
						const f = ht(u.averageLuminance, s.current);
						f !== s.current && (s.current = f, r(f));
					}
				}, o = Nt(i), a = t == null ? void 0 : t.current, l = typeof ResizeObserver < "u" && a ? new ResizeObserver(() => ke(i)) : null;
				return l && a && l.observe(a), () => {
					o(), l?.disconnect();
				};
			}, [e, t]), n;
		}
		const Kn = "(prefers-color-scheme: light)";
		function Vn() {
			const [t, e] = (0, react.useState)(!1);
			return (0, react.useEffect)(() => {
				const n = window.matchMedia(Kn), r = () => e(n.matches);
				return r(), n.addEventListener("change", r), () => n.removeEventListener("change", r);
			}, []), t;
		}
		function Xn(t, e) {
			const n = (0, react.useContext)(Oe), r = (0, react.useContext)(Lt), s = (0, react.useContext)(kt), i = t ?? n.overLight ?? "auto", o = Vn(), a = i === "auto" && r !== null, l = Un(e ?? null, i === "auto" && !a);
			return (0, react.useEffect)(() => {
				if (!a || !r) return;
				const d = e == null ? void 0 : e.current;
				if (d) return r(d);
			}, [
				a,
				r,
				e
			]), i !== "auto" ? i : r ? s ?? o : l ?? o;
		}
		const Qe = {
			blur: 3,
			saturation: 100,
			brightness: 1.1,
			tint: "light-dark(rgb(255 255 255), rgb(18 20 26))",
			tintStrength: .2,
			refraction: 1,
			depth: 8,
			curvature: .2,
			dispersion: .1
		};
		const Yn = Object.keys(Qe);
		function Qn(...t) {
			const e = { ...Qe };
			for (const n of t) if (n) for (const r of Yn) {
				const s = n[r];
				s !== void 0 && (e[r] = s);
			}
			return e;
		}
		function A(t) {
			const { as: e = "div", quality: n, overLight: r, cornerRadius: s = 20, optics: i, elasticity: o = .2, highlightIntensity: a = 1, hoverBrightnessBoost: l = 0, onPointerEnter: d, onPointerLeave: u, className: f, style: p, children: x, ...v } = t, b = Ut(n), h = (0, react.useContext)(Oe), y = (0, react.useRef)(null), g = Xn(r, y), m = (0, react.useMemo)(() => Qn(Qe, i), [i]), N = (0, react.useRef)(null), k = (0, react.useRef)(!1), L = (0, react.useRef)(null), F = (0, react.useRef)(null), [E, C] = (0, react.useState)({
				width: 0,
				height: 0
			});
			(0, react.useEffect)(() => {
				const R = y.current;
				if (!R || typeof ResizeObserver > "u") return;
				let _;
				const G = new ResizeObserver(() => {
					window.clearTimeout(_), _ = window.setTimeout(() => {
						C((M) => {
							const H = R.offsetWidth, re = R.offsetHeight;
							return M.width === H && M.height === re ? M : {
								width: H,
								height: re
							};
						});
					}, 100);
				});
				return G.observe(R), () => {
					window.clearTimeout(_), G.disconnect();
				};
			}, []);
			const O = (0, react.useMemo)(() => typeof window > "u" ? 1 : Math.min(window.devicePixelRatio || 1, 2), []), { filterId: q, baseScaleRef: ne, setFilterScale: Q, setFilterBrightness: K } = Wt({
				enabled: b !== "low" && E.width >= 2 && E.height >= 2,
				shared: b === "medium" && l <= 0,
				map: {
					width: E.width,
					height: E.height,
					radius: s,
					edge: Math.max(m.depth, .5),
					curvature: m.curvature,
					strength: m.refraction,
					dpr: O,
					rasterScale: h.lensMapRasterScale
				},
				blur: m.blur,
				saturation: m.saturation,
				brightness: m.brightness,
				animateBrightness: l > 0,
				dispersion: b === "high" ? m.dispersion : 0
			}), le = (R) => {
				if (l <= 0) return;
				if (k.current = R, q && b !== "low") {
					K(R ? m.brightness + l : m.brightness);
					return;
				}
				const _ = N.current;
				if (!_) return;
				const G = R ? m.brightness + l : m.brightness, M = `blur(${m.blur}px) saturate(${m.saturation}%) brightness(${G})`;
				_.style.setProperty("backdrop-filter", M), _.style.setProperty("-webkit-backdrop-filter", M);
			};
			(0, react.useEffect)(() => {
				!q || !k.current || l <= 0 || b === "low" || K(m.brightness + l);
			}, [
				q,
				l,
				b,
				m.brightness,
				K
			]);
			const ce = (0, react.useRef)(null);
			(0, react.useEffect)(() => {
				const R = y.current, _ = L.current;
				if (!R || !_ || b !== "high" || !q || o <= 0) return;
				const G = ne.current, M = {
					scale: G,
					tx: 0,
					ty: 0,
					vs: 0,
					vtx: 0,
					vty: 0,
					targetScale: G,
					targetTx: 0,
					targetTy: 0,
					raf: 0
				};
				ce.current = M;
				const H = () => {
					Q(M.scale), _.style.transform = `translate3d(${M.tx.toFixed(2)}px, ${M.ty.toFixed(2)}px, 0)`;
				}, re = () => {
					const j = .016666666666666666;
					let we = !1;
					const xe = (Ie, Me, Ze) => {
						const Rt = 180 * (Ze - Ie) - 20 * Me;
						return Me += Rt * j, Ie += Me * j, (Math.abs(Ze - Ie) > .01 || Math.abs(Me) > .01) && (we = !0), [Ie, Me];
					};
					[M.scale, M.vs] = xe(M.scale, M.vs, M.targetScale), [M.tx, M.vtx] = xe(M.tx, M.vtx, M.targetTx), [M.ty, M.vty] = xe(M.ty, M.vty, M.targetTy), H(), M.raf = we ? requestAnimationFrame(re) : 0;
				}, ye = () => {
					M.raf || (M.raf = requestAnimationFrame(re));
				}, ve = (Z) => {
					const D = R.getBoundingClientRect();
					if (D.width === 0 || D.height === 0) return;
					const j = (Z.clientX - (D.left + D.width / 2)) / D.width, we = (Z.clientY - (D.top + D.height / 2)) / D.height, xe = Math.min(1, Math.hypot(j, we) * 2);
					M.targetScale = G * (1 + o * .5 * (1 - xe * .6)), M.targetTx = j * o * 24, M.targetTy = we * o * 24, ye();
				}, se = () => {
					M.targetScale = G, M.targetTx = 0, M.targetTy = 0, ye();
				};
				return R.addEventListener("pointermove", ve), R.addEventListener("pointerleave", se), R.addEventListener("pointercancel", se), () => {
					R.removeEventListener("pointermove", ve), R.removeEventListener("pointerleave", se), R.removeEventListener("pointercancel", se), M.raf && cancelAnimationFrame(M.raf), _.style.transform = "", Q(G), ce.current = null;
				};
			}, [
				b,
				q,
				o,
				ne,
				Q
			]), (0, react.useEffect)(() => {
				const R = y.current, _ = F.current;
				if (!R || !_ || a <= 0) return;
				let G = 0, M = 0, H = 0;
				const re = (D) => _.style.setProperty("--ngs-spec-o", D.toFixed(3)), ye = () => {
					M += (H - M) * .18, Math.abs(H - M) < .005 && (M = H), re(M), G = M === H ? 0 : requestAnimationFrame(ye);
				}, ve = () => {
					G || (G = requestAnimationFrame(ye));
				}, se = (D) => {
					const j = R.getBoundingClientRect();
					j.width === 0 || j.height === 0 || (_.style.setProperty("--ngx", `${((D.clientX - j.left) / j.width * 100).toFixed(2)}%`), _.style.setProperty("--ngy", `${((D.clientY - j.top) / j.height * 100).toFixed(2)}%`), H = 1, ve());
				}, Z = () => {
					H = 0, ve();
				};
				return R.addEventListener("pointermove", se), R.addEventListener("pointerleave", Z), R.addEventListener("pointercancel", Z), () => {
					R.removeEventListener("pointermove", se), R.removeEventListener("pointerleave", Z), R.removeEventListener("pointercancel", Z), G && cancelAnimationFrame(G), _.style.removeProperty("--ngs-spec-o"), _.style.removeProperty("--ngx"), _.style.removeProperty("--ngy");
				};
			}, [a]);
			const w = `blur(${m.blur}px) saturate(${m.saturation}%) brightness(${m.brightness})`, I = b !== "low" && q ? { backdropFilter: `url(#${q})` } : {
				backdropFilter: w,
				WebkitBackdropFilter: w
			}, $ = ["ngs-surface", f].filter(Boolean).join(" "), W = e, Be = {
				borderRadius: s,
				"--ngs-hl": a,
				...p
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(W, {
				...v,
				ref: y,
				className: $,
				"data-ngs-quality": b,
				"data-ngs-light": g ? "true" : "false",
				style: Be,
				onPointerEnter: (R) => {
					l > 0 && le(!0), d?.(R);
				},
				onPointerLeave: (R) => {
					l > 0 && le(!1), u?.(R);
				},
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "ngs-motion",
					"data-ngs-internal": "style",
					ref: L,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "ngs-effect",
							"data-ngs-internal": "style",
							style: I,
							ref: N
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "ngs-highlight",
							"data-ngs-internal": "style",
							ref: F
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "ngs-content",
							"data-ngs-internal": "style",
							children: x
						})
					]
				})
			});
		}
		function fr(t) {
			const { variant: e = "capsule", size: n = "md", icon: r, disabled: s, hoverBrightnessBoost: i = .5, className: o, children: a, quality: l, overLight: d, optics: u, elasticity: f, highlightIntensity: p, ...x } = t, v = [
				"ngs-btn",
				`ngs-btn--${e}`,
				`ngs-btn--${n}`,
				o
			].filter(Boolean).join(" ");
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(A, {
				as: "button",
				type: "button",
				cornerRadius: 999,
				className: v,
				disabled: s,
				quality: l,
				overLight: d,
				optics: u,
				elasticity: f,
				highlightIntensity: p,
				hoverBrightnessBoost: s ? 0 : i,
				...x,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: "ngs-btn-content",
					children: [r && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "ngs-btn-icon",
						"aria-hidden": "true",
						children: r
					}), a]
				})
			});
		}
		function yr(t) {
			const { size: e = "md", invalid: n, leading: r, trailing: s, cornerRadius: i = 14, className: o, style: a, disabled: l, quality: d, overLight: u, optics: f, elasticity: p, highlightIntensity: x, hoverBrightnessBoost: v, ...b } = t, h = [
				"ngs-input",
				`ngs-input--${e}`,
				o
			].filter(Boolean).join(" ");
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(A, {
				as: "label",
				cornerRadius: i,
				className: h,
				style: a,
				"data-invalid": n ? "true" : void 0,
				"data-disabled": l ? "true" : void 0,
				quality: d,
				overLight: u,
				optics: f,
				elasticity: p,
				highlightIntensity: x,
				hoverBrightnessBoost: v,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: "ngs-input-inner",
					children: [
						r && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "ngs-input-affix",
							"aria-hidden": "true",
							children: r
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
							className: "ngs-input-field",
							disabled: l,
							"aria-invalid": n || void 0,
							...b
						}),
						s && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "ngs-input-affix ngs-input-affix--trailing",
							children: s
						})
					]
				})
			});
		}
		function wr(t) {
			const { checked: e = !1, onChange: n, size: r = "md", className: s, disabled: i, quality: o, overLight: a, optics: l, elasticity: d, highlightIntensity: u, hoverBrightnessBoost: f = .35, ...p } = t, x = [
				"ngs-switch",
				`ngs-switch--${r}`,
				s
			].filter(Boolean).join(" "), v = p.onClick;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(A, {
				as: "button",
				type: "button",
				role: "switch",
				"aria-checked": e,
				disabled: i,
				cornerRadius: 999,
				className: x,
				quality: o,
				overLight: a,
				optics: l,
				elasticity: d,
				highlightIntensity: u,
				hoverBrightnessBoost: i ? 0 : f,
				...p,
				onClick: (b) => {
					v?.(b), b.defaultPrevented || n == null || n(!e);
				},
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: "ngs-switch-inner",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "ngs-switch-rail",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: "ngs-switch-fill" })
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "ngs-switch-knob",
						"aria-hidden": "true"
					})]
				})
			});
		}
		function Mr(t) {
			const { value: e = 0, min: n = 0, max: r = 100, step: s = 1, onChange: i, size: o = "md", cornerRadius: a = 999, className: l, style: d, disabled: u, quality: f, overLight: p, optics: x, elasticity: v, highlightIntensity: b, hoverBrightnessBoost: h, ...y } = t, g = r > n ? Math.min(100, Math.max(0, (e - n) / (r - n) * 100)) : 0, m = [
				"ngs-slider",
				`ngs-slider--${o}`,
				l
			].filter(Boolean).join(" "), k = Math.max(0, a - (o === "sm" ? 3 : 4)), L = g / 100;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(A, {
				cornerRadius: a,
				className: m,
				style: d,
				"data-disabled": u ? "true" : void 0,
				quality: f,
				overLight: p,
				optics: x,
				elasticity: v,
				highlightIntensity: b,
				hoverBrightnessBoost: h,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: "ngs-slider-inner",
					style: {
						"--ngs-slider-f": L.toFixed(4),
						"--ngs-slider-radius": `${k}px`
					},
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "ngs-slider-rail",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: "ngs-slider-fill" })
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						type: "range",
						className: "ngs-slider-field",
						value: e,
						min: n,
						max: r,
						step: s,
						disabled: u,
						onChange: (F) => i == null ? void 0 : i(Number(F.target.value)),
						...y
					})]
				})
			});
		}
		function Nr(t) {
			const { items: e, value: n, onChange: r, size: s = "md", cornerRadius: i = 999, className: o, quality: a, overLight: l, optics: d, elasticity: u, highlightIntensity: f, hoverBrightnessBoost: p, ...x } = t, v = [
				"ngs-segmented",
				`ngs-segmented--${s}`,
				o
			].filter(Boolean).join(" ");
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(A, {
				cornerRadius: i,
				className: v,
				quality: a,
				overLight: l,
				optics: d,
				elasticity: u,
				highlightIntensity: f,
				hoverBrightnessBoost: p,
				...x,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "ngs-segmented-inner",
					role: "radiogroup",
					children: e.map((b) => {
						const h = b.key === n;
						return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							role: "radio",
							"aria-checked": h,
							className: ["ngs-segment", h && "ngs-segment--active"].filter(Boolean).join(" "),
							onClick: () => r == null ? void 0 : r(b.key),
							children: [b.icon && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "ngs-segment-icon",
								"aria-hidden": "true",
								children: b.icon
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "ngs-segment-label",
								children: b.label
							})]
						}, b.key);
					})
				})
			});
		}
		//#endregion
		//#region \0dsh-css:H:\WorkProj\dsh-nico-theme\src\client\AquaAppearanceRow.module.css.mjs
		const css$4 = ".Xp-nsa_group{border-bottom:1px solid var(--dsw-alias-border-l2);flex-direction:column;gap:24px;padding:12px 0 20px;display:flex}.Xp-nsa_subGroup{flex-direction:column;gap:4px;display:flex}.Xp-nsa_subTitle{color:var(--dsw-alias-label-primary);margin:0;font-size:14px;font-weight:600;line-height:22px}.Xp-nsa_controls{flex-direction:column;min-width:0;display:flex}.Xp-nsa_row,.Xp-nsa_knob,.Xp-nsa_rowStandalone{border-bottom:1px solid var(--dsw-alias-border-l2);min-height:40px;padding:8px 0}.Xp-nsa_row,.Xp-nsa_knob{grid-template-columns:minmax(120px,.75fr) minmax(0,1.25fr);align-items:center;column-gap:16px;display:grid}.Xp-nsa_rowStandalone{justify-content:stretch;display:flex}.Xp-nsa_rowStandalone .Xp-nsa_rowControl{width:100%}.Xp-nsa_rowLabel,.Xp-nsa_knobLabel{min-width:0;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:20px}.Xp-nsa_knob{grid-template-columns:minmax(120px,.75fr) minmax(0,1fr) auto}.Xp-nsa_rowControl{justify-content:flex-end;align-items:center;gap:8px;min-width:0;display:flex}.Xp-nsa_knobHint{color:var(--dsw-alias-label-tertiary);padding:2px 0 6px;font-size:12px;line-height:18px}.Xp-nsa_slider{width:100%;min-width:0}.Xp-nsa_numberWrap{justify-content:flex-end;align-items:center;gap:6px;min-width:96px;display:inline-flex}.Xp-nsa_number{width:84px;min-width:0}.Xp-nsa_number .ngs-input-field{font-variant-numeric:tabular-nums;text-align:right}.Xp-nsa_number .ngs-input-field::-webkit-outer-spin-button,.Xp-nsa_number .ngs-input-field::-webkit-inner-spin-button{appearance:none;margin:0}.Xp-nsa_unit{min-width:14px;color:var(--dsw-alias-label-tertiary);flex:none;font-size:13px;line-height:20px}.Xp-nsa_segmented{min-width:0;max-width:100%}.Xp-nsa_segmentedCards{width:100%;min-width:0;display:block}.Xp-nsa_segmentedCards .ngs-segmented-inner{grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;width:100%;padding:6px;display:grid}.Xp-nsa_segmentedCards .ngs-segment{border-radius:999px;flex-direction:column;gap:6px;min-width:0;min-height:64px}.Xp-nsa_cardVisual{width:64px;height:36px;color:var(--dsw-alias-label-primary);justify-content:center;align-items:center;display:inline-flex}.Xp-nsa_thumbFluid{background:radial-gradient(24px 16px at 30% 40%, hsl(var(--dsh-aqua-fluid-hue,200deg) 60% 62% / .85), transparent 70%), radial-gradient(28px 20px at 72% 62%, hsl(calc(var(--dsh-aqua-fluid-hue,200deg) + 40deg) 55% 45% / .8), transparent 75%), linear-gradient(160deg, hsl(var(--dsh-aqua-fluid-hue,200deg) 42% 24%), hsl(calc(var(--dsh-aqua-fluid-hue,200deg) + 25deg) 45% 14%));border-radius:6px;width:100%;height:100%;display:block}.Xp-nsa_thumbImage{object-fit:cover;border-radius:6px;width:100%;height:100%}.Xp-nsa_thumbPlaceholder{border:1px dashed var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:6px;width:100%;height:100%;display:block}.Xp-nsa_toggle{flex:none}.Xp-nsa_wallpaperPick{flex-wrap:wrap;justify-content:flex-end;align-items:center;gap:8px;width:100%;display:flex}.Xp-nsa_fileInput{display:none}.Xp-nsa_pickButton{flex:none}.Xp-nsa_deleteButton{--ngs-text:var(--dsw-alias-label-error);color:var(--dsw-alias-label-error)}.Xp-nsa_switchGrid{grid-template-columns:repeat(3,minmax(0,1fr));gap:0;display:grid}.Xp-nsa_switchCell{box-sizing:border-box;border-right:1px solid var(--dsw-alias-border-l2);justify-content:space-between;align-items:center;gap:12px;min-height:48px;padding:6px 8px;display:flex}.Xp-nsa_switchCell:last-child{border-right:none}.Xp-nsa_switchLabel{min-width:0;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:20px}@media (width<=640px){.Xp-nsa_group{gap:20px;padding:10px 0 16px}.Xp-nsa_row,.Xp-nsa_knob{grid-template-columns:minmax(0,1fr) auto;align-items:center;row-gap:8px}.Xp-nsa_rowLabel,.Xp-nsa_knobLabel{grid-column:1/-1}.Xp-nsa_rowControl{justify-content:flex-start}.Xp-nsa_rowStandalone{justify-content:stretch}.Xp-nsa_rowStandalone .Xp-nsa_rowControl{justify-content:flex-start;width:100%}.Xp-nsa_segmentedCards .ngs-segment{gap:4px;min-height:56px}.Xp-nsa_cardVisual{width:52px;height:30px}.Xp-nsa_wallpaperPick{justify-content:flex-start}.Xp-nsa_knobHint{padding:2px 0 6px}}";
		const tagId$4 = "dsh-nico-theme/AquaAppearanceRow.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$4) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-nico-theme";
			tag.dataset.pluginCss = tagId$4;
			tag.textContent = css$4;
			document.head.appendChild(tag);
		}
		var AquaAppearanceRow_module_css_default = {
			"cardVisual": "Xp-nsa_cardVisual",
			"controls": "Xp-nsa_controls",
			"deleteButton": "Xp-nsa_deleteButton",
			"fileInput": "Xp-nsa_fileInput",
			"group": "Xp-nsa_group",
			"knob": "Xp-nsa_knob",
			"knobHint": "Xp-nsa_knobHint",
			"knobLabel": "Xp-nsa_knobLabel",
			"number": "Xp-nsa_number",
			"numberWrap": "Xp-nsa_numberWrap",
			"pickButton": "Xp-nsa_pickButton",
			"row": "Xp-nsa_row",
			"rowControl": "Xp-nsa_rowControl",
			"rowLabel": "Xp-nsa_rowLabel",
			"rowStandalone": "Xp-nsa_rowStandalone",
			"segmented": "Xp-nsa_segmented",
			"segmentedCards": "Xp-nsa_segmentedCards",
			"slider": "Xp-nsa_slider",
			"subGroup": "Xp-nsa_subGroup",
			"subTitle": "Xp-nsa_subTitle",
			"switchCell": "Xp-nsa_switchCell",
			"switchGrid": "Xp-nsa_switchGrid",
			"switchLabel": "Xp-nsa_switchLabel",
			"thumbFluid": "Xp-nsa_thumbFluid",
			"thumbImage": "Xp-nsa_thumbImage",
			"thumbPlaceholder": "Xp-nsa_thumbPlaceholder",
			"toggle": "Xp-nsa_toggle",
			"unit": "Xp-nsa_unit",
			"wallpaperPick": "Xp-nsa_wallpaperPick"
		};
		//#endregion
		//#region src/client/AquaControls.tsx
		/** Render one knob row. */
		function Knob({ label, value, min, max, step, unit, onChange }) {
			const clamp = (n) => Math.min(max, Math.max(min, Number.isFinite(n) ? n : min));
			const safeValue = clamp(value);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
				className: AquaAppearanceRow_module_css_default.knob,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: AquaAppearanceRow_module_css_default.knobLabel,
						children: label
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Mr, {
						className: AquaAppearanceRow_module_css_default.slider,
						min,
						max,
						step,
						value: safeValue,
						onChange: (next) => {
							onChange(clamp(next));
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						className: AquaAppearanceRow_module_css_default.numberWrap,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(yr, {
							className: AquaAppearanceRow_module_css_default.number,
							type: "number",
							size: "sm",
							min,
							max,
							step,
							value: safeValue,
							onChange: (e) => {
								onChange(clamp(Number(e.target.value)));
							}
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: AquaAppearanceRow_module_css_default.unit,
							children: unit
						})]
					})
				]
			});
		}
		/** Render a two-option segmented picker (compact pills or large cards). */
		function Segmented({ label, value, options, onSelect, variant = "compact" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Nr, {
				className: variant === "cards" ? AquaAppearanceRow_module_css_default.segmentedCards : AquaAppearanceRow_module_css_default.segmented,
				"aria-label": label,
				items: options.map((option) => ({
					key: option.id,
					label: option.label,
					icon: option.visual !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: option.visualClass ?? AquaAppearanceRow_module_css_default.cardVisual,
						children: option.visual
					})
				})),
				value,
				onChange: (key) => {
					onSelect(key);
				}
			});
		}
		/** Render the compact switch used by every boolean appearance setting. */
		function Toggle({ label, pressed, onChange }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(wr, {
				className: AquaAppearanceRow_module_css_default.toggle,
				"aria-label": label,
				checked: pressed,
				onChange
			});
		}
		/** Capsule action button (choose image / choose video / delete / enable). */
		function PickButton({ children, onClick, danger = false }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(fr, {
				className: danger ? `${AquaAppearanceRow_module_css_default.pickButton} ${AquaAppearanceRow_module_css_default.deleteButton}` : AquaAppearanceRow_module_css_default.pickButton,
				size: "sm",
				onClick,
				children
			});
		}
		/** Read a file, downscale to ≤1920px, and return a compact JPEG data URL. */
		async function fileToDataUrl(file) {
			const raw = await new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onload = () => {
					resolve(String(reader.result));
				};
				reader.onerror = () => {
					reject(reader.error);
				};
				reader.readAsDataURL(file);
			});
			const image = await new Promise((resolve, reject) => {
				const im = new Image();
				im.onload = () => {
					resolve(im);
				};
				im.onerror = () => {
					reject(/* @__PURE__ */ new Error("image load failed"));
				};
				im.src = raw;
			});
			const scale = Math.min(1, 1920 / Math.max(image.width, image.height));
			const w = Math.max(1, Math.round(image.width * scale));
			const h = Math.max(1, Math.round(image.height * scale));
			const canvas = document.createElement("canvas");
			canvas.width = w;
			canvas.height = h;
			const ctx = canvas.getContext("2d");
			if (ctx === null) return raw;
			ctx.drawImage(image, 0, 0, w, h);
			return canvas.toDataURL("image/jpeg", .82);
		}
		//#endregion
		//#region src/client/wallpaper-store.ts
		/**
		* Large wallpaper storage: videos too big for localStorage (its ~5MB quota)
		* go into IndexedDB as raw blobs, while the setting keeps a tiny `idb:<id>`
		* marker. On boot the layer loads the blob, wraps it in an object URL and
		* hands it to the <video> element — no quota trouble, survives restarts.
		*/
		const DB_NAME = "dsh-aqua-media";
		const STORE = "wallpaper";
		const DB_VERSION = 1;
		/** Fixed key holding the File System Access handle (the browser's remembered
		*  file authorization — the closest the web allows to "remember the path"). */
		const HANDLE_KEY = "videoHandle";
		function openDb() {
			return new Promise((resolve, reject) => {
				const request = indexedDB.open(DB_NAME, DB_VERSION);
				request.onupgradeneeded = () => {
					const db = request.result;
					if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
				};
				request.onsuccess = () => {
					resolve(request.result);
				};
				request.onerror = () => {
					reject(request.error ?? /* @__PURE__ */ new Error("indexedDB open failed"));
				};
			});
		}
		function tx(db, mode) {
			return db.transaction(STORE, mode).objectStore(STORE);
		}
		/** Store a blob and return its `idb:<id>` marker ('' on failure → caller
		*  falls back to the data-URL path). */
		async function saveVideoBlob(blob) {
			try {
				const db = await openDb();
				const id = `v${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
				await new Promise((resolve, reject) => {
					const request = tx(db, "readwrite").put(blob, id);
					request.onsuccess = () => {
						resolve();
					};
					request.onerror = () => {
						reject(request.error ?? /* @__PURE__ */ new Error("blob put failed"));
					};
				});
				db.close();
				return `idb:${id}`;
			} catch {
				return "";
			}
		}
		/** Load a stored blob by id (null when absent). */
		async function loadVideoBlob(id) {
			try {
				const db = await openDb();
				const blob = await new Promise((resolve, reject) => {
					const request = tx(db, "readonly").get(id);
					request.onsuccess = () => {
						resolve(request.result);
					};
					request.onerror = () => {
						reject(request.error ?? /* @__PURE__ */ new Error("blob get failed"));
					};
				});
				db.close();
				return blob ?? null;
			} catch {
				return null;
			}
		}
		/** Drop a stored blob (ignores failures). */
		async function deleteVideoBlob(id) {
			try {
				const db = await openDb();
				await new Promise((resolve) => {
					const request = tx(db, "readwrite").delete(id);
					request.onsuccess = () => {
						resolve();
					};
					request.onerror = () => {
						resolve();
					};
				});
				db.close();
			} catch {}
		}
		/** Persist a File System Access handle so the next visit can re-read the
		*  ORIGINAL file without the user picking it again. */
		async function saveVideoHandle(handle) {
			try {
				const db = await openDb();
				await new Promise((resolve, reject) => {
					const request = tx(db, "readwrite").put(handle, HANDLE_KEY);
					request.onsuccess = () => {
						resolve();
					};
					request.onerror = () => {
						reject(request.error ?? /* @__PURE__ */ new Error("handle put failed"));
					};
				});
				db.close();
				return true;
			} catch {
				return false;
			}
		}
		/** Load the remembered file handle (null when absent or storage fails). */
		async function loadVideoHandle() {
			try {
				const db = await openDb();
				const handle = await new Promise((resolve, reject) => {
					const request = tx(db, "readonly").get(HANDLE_KEY);
					request.onsuccess = () => {
						resolve(request.result);
					};
					request.onerror = () => {
						reject(request.error ?? /* @__PURE__ */ new Error("handle get failed"));
					};
				});
				db.close();
				return handle ?? null;
			} catch {
				return null;
			}
		}
		//#endregion
		//#region \0dsh-css:H:\WorkProj\dsh-nico-theme\src\client\NicoSettingsPage.module.css.mjs
		const css$3 = ".-z8VGW_page{flex-direction:column;gap:20px;padding:6px 0 24px;display:flex}.-z8VGW_header{border-bottom:1px solid var(--dsw-alias-border-l2);justify-content:space-between;align-items:flex-start;gap:16px;padding:4px 0 16px;display:flex}.-z8VGW_headerText{flex-direction:column;gap:4px;min-width:0;display:flex}.-z8VGW_title{color:var(--dsw-alias-label-primary);margin:0;font-size:20px;font-weight:700;line-height:28px}.-z8VGW_subtitle{color:var(--dsw-alias-label-secondary);margin:0;font-size:13px;line-height:20px}.-z8VGW_headerActions{flex:none;align-items:center;gap:10px;padding-top:2px;display:inline-flex}.-z8VGW_headerToggleLabel{color:var(--dsw-alias-label-secondary);white-space:nowrap;font-size:13px;line-height:20px}.-z8VGW_notice{border:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 96%, transparent);border-radius:12px;justify-content:space-between;align-items:center;gap:12px;padding:12px 14px;display:flex}.-z8VGW_noticeText{min-width:0;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:20px}.-z8VGW_enableButton{background:var(--dsw-alias-state-business-primary);color:#fff;cursor:pointer;border:0;border-radius:8px;flex:none;height:32px;padding:0 14px;font-size:13px;font-weight:600;line-height:20px}.-z8VGW_enableButton:hover{background:var(--dsw-alias-button-primary-hover)}.-z8VGW_enableButton:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}.-z8VGW_content{flex-direction:column;gap:0;display:flex}.-z8VGW_contentDisabled{opacity:.52;pointer-events:none}@media (width<=640px){.-z8VGW_header{flex-direction:column;align-items:stretch}.-z8VGW_headerActions{justify-content:flex-start}.-z8VGW_notice{flex-direction:column;align-items:stretch}.-z8VGW_enableButton{width:100%}}";
		const tagId$3 = "dsh-nico-theme/NicoSettingsPage.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$3) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-nico-theme";
			tag.dataset.pluginCss = tagId$3;
			tag.textContent = css$3;
			document.head.appendChild(tag);
		}
		var NicoSettingsPage_module_css_default = {
			"content": "-z8VGW_content",
			"contentDisabled": "-z8VGW_contentDisabled",
			"enableButton": "-z8VGW_enableButton",
			"header": "-z8VGW_header",
			"headerActions": "-z8VGW_headerActions",
			"headerText": "-z8VGW_headerText",
			"headerToggleLabel": "-z8VGW_headerToggleLabel",
			"notice": "-z8VGW_notice",
			"noticeText": "-z8VGW_noticeText",
			"page": "-z8VGW_page",
			"subtitle": "-z8VGW_subtitle",
			"title": "-z8VGW_title"
		};
		//#endregion
		//#region src/client/NicoSettingsPage.tsx
		/**
		* Dedicated settings page for the settings panel's left nav
		* (`settings.section`, id `nico`). Full-page edition of every glass knob and
		* the backdrop picker in a page shell with its own header and a disabled-state
		* empty view. The controls are nico-glass-kit components, wrapped in a
		* `GlassProvider` so the page carries the playground's own material. All
		* writes go through the same {@link AquaLayer} paths, so the Plugins card and
		* this page stay in sync.
		*/
		function NicoSettingsPage(props) {
			const { t, useStore, setEnabled, setMode, setBlur, setBrightness, setRefraction, setDepth, setCurvature, setDispersion, setHighlight, setElasticity, setElasticityStrength, setFluidHue, setFluidDepth, setBgBrightness, setBackground, setWallpaper, setWallpaperBlur, setWallpaperFrost, setVideoBlur, setVideoBrightness, authorizeVideo, setScrim, setScrimBlur } = props;
			const enabled = useStore((s) => s.enabled);
			const mode = useStore((s) => s.mode);
			const blur = useStore((s) => s.blur);
			const brightness = useStore((s) => s.brightness);
			const refraction = useStore((s) => s.refraction);
			const depth = useStore((s) => s.depth);
			const curvature = useStore((s) => s.curvature);
			const dispersion = useStore((s) => s.dispersion);
			const highlight = useStore((s) => s.highlight);
			const elasticity = useStore((s) => s.elasticity);
			const elasticityStrength = useStore((s) => s.elasticityStrength);
			const fluidHue = useStore((s) => s.fluidHue);
			const fluidDepth = useStore((s) => s.fluidDepth);
			const bgBrightness = useStore((s) => s.bgBrightness);
			const dark = useStore((s) => s.dark);
			const background = useStore((s) => s.background);
			const wallpaper = useStore((s) => s.wallpaper);
			const wallpaperBlur = useStore((s) => s.wallpaperBlur);
			const wallpaperFrost = useStore((s) => s.wallpaperFrost);
			const videoBlur = useStore((s) => s.videoBlur);
			const videoBrightness = useStore((s) => s.videoBrightness);
			const scrim = useStore((s) => s.scrim);
			const scrimBlur = useStore((s) => s.scrimBlur);
			const fileRef = (0, react.useRef)(null);
			const videoRef = (0, react.useRef)(null);
			const isVideoWallpaper = wallpaper.startsWith("data:video/") || wallpaper.startsWith("idb:") || wallpaper.startsWith("fsa:");
			const pickVideo = () => {
				const picker = window.showOpenFilePicker;
				if (picker !== void 0) (async () => {
					try {
						const [handle] = await picker({
							multiple: false,
							types: [{
								description: "Video",
								accept: { "video/*": [
									".mp4",
									".webm",
									".ogg",
									".mov",
									".m4v",
									".mkv"
								] }
							}]
						});
						if (handle === void 0) return;
						setBackground("wallpaper");
						if (await saveVideoHandle(handle)) setWallpaper(`fsa:${handle.name}`);
						else {
							const file = await handle.getFile();
							saveVideoBlob(file).then((id) => {
								if (id !== "") setWallpaper(id);
								else fileToDataUrl(file).then(setWallpaper);
							});
						}
					} catch {}
				})();
				else videoRef.current?.click();
			};
			const onChooseVideo = () => {
				if (wallpaper.startsWith("fsa:")) (async () => {
					const handle = await loadVideoHandle();
					if (handle !== null) try {
						const permission = await handle.queryPermission({ mode: "read" });
						if (permission === "granted") {
							authorizeVideo();
							return;
						}
						if (permission === "prompt") {
							if (await handle.requestPermission({ mode: "read" }) === "granted") {
								authorizeVideo();
								return;
							}
						}
					} catch {}
					pickVideo();
				})();
				else pickVideo();
			};
			const bgMin = dark ? 0 : 50;
			const bgMax = dark ? 50 : 100;
			const bgDisplay = Math.min(bgMax, Math.max(bgMin, bgBrightness));
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(dr, {
				quality: "high",
				overLight: !dark,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: NicoSettingsPage_module_css_default.page,
					"data-dsh-nico-page": true,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: NicoSettingsPage_module_css_default.header,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: NicoSettingsPage_module_css_default.headerText,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
									className: NicoSettingsPage_module_css_default.title,
									children: t("aqua.pageTitle")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: NicoSettingsPage_module_css_default.subtitle,
									children: t("aqua.pageSubtitle")
								})]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: NicoSettingsPage_module_css_default.headerActions,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: NicoSettingsPage_module_css_default.headerToggleLabel,
									children: enabled ? t("aqua.disableTheme") : t("aqua.enableTheme")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Toggle, {
									label: t("aqua.title"),
									pressed: enabled,
									onChange: setEnabled
								})]
							})]
						}),
						!enabled && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: NicoSettingsPage_module_css_default.notice,
							role: "status",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: NicoSettingsPage_module_css_default.noticeText,
								children: t("aqua.disabledNotice")
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PickButton, {
								onClick: () => {
									setEnabled(true);
								},
								children: t("aqua.enableTheme")
							})]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: `${NicoSettingsPage_module_css_default.content} ${!enabled ? NicoSettingsPage_module_css_default.contentDisabled : ""}`,
							"aria-hidden": !enabled,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: AquaAppearanceRow_module_css_default.subGroup,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: AquaAppearanceRow_module_css_default.subTitle,
										children: t("aqua.mode")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: AquaAppearanceRow_module_css_default.controls,
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											className: AquaAppearanceRow_module_css_default.rowStandalone,
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
												className: AquaAppearanceRow_module_css_default.rowControl,
												children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Segmented, {
													label: t("aqua.mode"),
													value: mode,
													variant: "cards",
													options: [{
														id: "mica",
														label: t("aqua.modeMica"),
														visual: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconEnhanceOutline16, {}),
														visualClass: AquaAppearanceRow_module_css_default.cardVisual
													}, {
														id: "compat",
														label: t("aqua.modeCompat"),
														visual: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCodeOutline16, {}),
														visualClass: AquaAppearanceRow_module_css_default.cardVisual
													}],
													onSelect: setMode
												})
											})
										})
									})]
								}),
								mode === "mica" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: AquaAppearanceRow_module_css_default.subGroup,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: AquaAppearanceRow_module_css_default.subTitle,
										children: t("aqua.materialGroup")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: AquaAppearanceRow_module_css_default.controls,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
												label: t("aqua.blur"),
												value: blur,
												min: 0,
												max: 64,
												step: .5,
												unit: "px",
												onChange: setBlur
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
												label: t("aqua.brightness"),
												value: brightness,
												min: 0,
												max: 2,
												step: .05,
												unit: "",
												onChange: setBrightness
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
												label: t("aqua.refraction"),
												value: refraction,
												min: 0,
												max: 100,
												step: 1,
												unit: "%",
												onChange: setRefraction
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
												label: t("aqua.depth"),
												value: depth,
												min: 0,
												max: 40,
												step: .5,
												unit: "px",
												onChange: setDepth
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
												label: t("aqua.curvature"),
												value: curvature,
												min: 0,
												max: 1,
												step: .01,
												unit: "",
												onChange: setCurvature
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
												label: t("aqua.dispersion"),
												value: dispersion,
												min: 0,
												max: 100,
												step: 1,
												unit: "%",
												onChange: setDispersion
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
												label: t("aqua.highlight"),
												value: highlight,
												min: 0,
												max: 2,
												step: .05,
												unit: "",
												onChange: setHighlight
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: AquaAppearanceRow_module_css_default.subGroup,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: AquaAppearanceRow_module_css_default.subTitle,
										children: t("aqua.background")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: AquaAppearanceRow_module_css_default.controls,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
												className: AquaAppearanceRow_module_css_default.rowStandalone,
												children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
													className: AquaAppearanceRow_module_css_default.rowControl,
													children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Segmented, {
														label: t("aqua.background"),
														value: background,
														variant: "cards",
														options: [{
															id: "fluid",
															label: t("aqua.backgroundFluid"),
															visual: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: AquaAppearanceRow_module_css_default.thumbFluid }),
															visualClass: AquaAppearanceRow_module_css_default.cardVisual
														}, {
															id: "wallpaper",
															label: t("aqua.backgroundWallpaper"),
															visual: wallpaper.startsWith("data:image/") ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
																className: AquaAppearanceRow_module_css_default.thumbImage,
																src: wallpaper,
																alt: ""
															}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: AquaAppearanceRow_module_css_default.thumbPlaceholder }),
															visualClass: AquaAppearanceRow_module_css_default.cardVisual
														}],
														onSelect: setBackground
													})
												})
											}),
											background === "fluid" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
												label: t("aqua.fluidHue"),
												value: fluidHue,
												min: 0,
												max: 360,
												step: 1,
												unit: "°",
												onChange: setFluidHue
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
												label: t("aqua.fluidDepth"),
												value: fluidDepth,
												min: 0,
												max: 100,
												step: 1,
												unit: "%",
												onChange: setFluidDepth
											})] }),
											background === "wallpaper" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
												/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
													className: AquaAppearanceRow_module_css_default.row,
													children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: AquaAppearanceRow_module_css_default.rowLabel,
														children: t("aqua.wallpaper")
													}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
														className: AquaAppearanceRow_module_css_default.rowControl,
														children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
															className: AquaAppearanceRow_module_css_default.wallpaperPick,
															children: [
																/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
																	ref: fileRef,
																	type: "file",
																	accept: "image/*",
																	className: AquaAppearanceRow_module_css_default.fileInput,
																	onChange: (e) => {
																		const file = e.target.files?.[0];
																		if (file !== void 0) {
																			setBackground("wallpaper");
																			fileToDataUrl(file).then(setWallpaper);
																		}
																		e.target.value = "";
																	}
																}),
																/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
																	ref: videoRef,
																	type: "file",
																	accept: "video/mp4,video/webm,video/ogg,video/quicktime",
																	className: AquaAppearanceRow_module_css_default.fileInput,
																	onChange: (e) => {
																		const file = e.target.files?.[0];
																		if (file !== void 0) {
																			setBackground("wallpaper");
																			saveVideoBlob(file).then((id) => {
																				if (id !== "") setWallpaper(id);
																				else fileToDataUrl(file).then(setWallpaper);
																			});
																		}
																		e.target.value = "";
																	}
																}),
																/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PickButton, {
																	onClick: () => {
																		fileRef.current?.click();
																	},
																	children: t("aqua.chooseImage")
																}),
																/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PickButton, {
																	onClick: onChooseVideo,
																	children: t("aqua.chooseVideo")
																}),
																wallpaper !== "" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PickButton, {
																	danger: true,
																	onClick: () => {
																		setWallpaper("");
																	},
																	children: t("aqua.deleteWallpaper")
																})
															]
														})
													})]
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
													className: AquaAppearanceRow_module_css_default.knobHint,
													children: t("aqua.wallpaperHint")
												}),
												!isVideoWallpaper && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
													label: t("aqua.wallpaperBlur"),
													value: wallpaperBlur,
													min: 0,
													max: 40,
													step: .5,
													unit: "px",
													onChange: setWallpaperBlur
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
													label: t("aqua.wallpaperFrost"),
													value: wallpaperFrost,
													min: 0,
													max: 100,
													step: 1,
													unit: "%",
													onChange: setWallpaperFrost
												})] }),
												isVideoWallpaper && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
														label: t("aqua.videoBlur"),
														value: videoBlur,
														min: 0,
														max: 40,
														step: .5,
														unit: "px",
														onChange: setVideoBlur
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
														label: t("aqua.videoBrightness"),
														value: videoBrightness,
														min: 0,
														max: 100,
														step: 1,
														unit: "%",
														onChange: setVideoBrightness
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
														className: AquaAppearanceRow_module_css_default.knobHint,
														children: t("aqua.videoHint")
													})
												] })
											] }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
												label: t("aqua.bgBrightness"),
												value: bgDisplay,
												min: bgMin,
												max: bgMax,
												step: 1,
												unit: "%",
												onChange: setBgBrightness
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
												className: AquaAppearanceRow_module_css_default.knobHint,
												children: t(dark ? "aqua.bgBrightnessHintDark" : "aqua.bgBrightnessHintLight")
											})
										]
									})]
								}),
								mode === "mica" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: AquaAppearanceRow_module_css_default.subGroup,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: AquaAppearanceRow_module_css_default.subTitle,
										children: t("aqua.decorHover")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: AquaAppearanceRow_module_css_default.controls,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: AquaAppearanceRow_module_css_default.row,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: AquaAppearanceRow_module_css_default.rowLabel,
												children: t("aqua.elasticity")
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
												className: AquaAppearanceRow_module_css_default.rowControl,
												children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Toggle, {
													label: t("aqua.elasticity"),
													pressed: elasticity,
													onChange: setElasticity
												})
											})]
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
											label: t("aqua.elasticityStrength"),
											value: elasticityStrength,
											min: 0,
											max: .5,
											step: .01,
											unit: "",
											onChange: setElasticityStrength
										})]
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: AquaAppearanceRow_module_css_default.subGroup,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: AquaAppearanceRow_module_css_default.subTitle,
										children: t("aqua.scrimGroup")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: AquaAppearanceRow_module_css_default.controls,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
											label: t("aqua.scrim"),
											value: scrim,
											min: 0,
											max: 100,
											step: 1,
											unit: "%",
											onChange: setScrim
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
											label: t("aqua.scrimBlur"),
											value: scrimBlur,
											min: 0,
											max: 40,
											step: .5,
											unit: "px",
											onChange: setScrimBlur
										})]
									})]
								})
							]
						})
					]
				})
			});
		}
		//#endregion
		//#region src/client/settings-store.ts
		/**
		* Aqua row slot store: a mirror of the layer's state (enable flag plus the
		* knobs and the backdrop source). The plugin's apply-world change listener is
		* the only writer; the row component reads via props.useStore.
		*/
		/**
		* Declares the Aqua row state and write surface.
		* @returns the store handle.
		*/
		function createAquaRowStore() {
			return (0, _deepseek_ai_dsh_client_store.defineStore)({
				init: () => ({
					enabled: true,
					mode: "mica",
					blur: 3,
					brightness: 1.1,
					refraction: 100,
					depth: 8,
					curvature: .2,
					dispersion: 10,
					highlight: 1,
					elasticity: true,
					elasticityStrength: .2,
					fluidHue: 320,
					fluidDepth: 25,
					bgBrightness: 50,
					dark: false,
					background: "fluid",
					wallpaper: "",
					wallpaperBlur: 0,
					wallpaperFrost: 0,
					videoBlur: 6,
					videoBrightness: 45,
					scrim: 25,
					scrimBlur: 5,
					revision: -1
				}),
				actions: { sync: (d, next, revision) => {
					if (revision <= d.revision) return;
					d.enabled = next.enabled;
					d.mode = next.mode;
					d.blur = next.blur;
					d.brightness = next.brightness;
					d.refraction = next.refraction;
					d.depth = next.depth;
					d.curvature = next.curvature;
					d.dispersion = next.dispersion;
					d.highlight = next.highlight;
					d.elasticity = next.elasticity;
					d.elasticityStrength = next.elasticityStrength;
					d.fluidHue = next.fluidHue;
					d.fluidDepth = next.fluidDepth;
					d.bgBrightness = next.bgBrightness;
					d.dark = next.dark;
					d.background = next.background;
					d.wallpaper = next.wallpaper;
					d.wallpaperBlur = next.wallpaperBlur;
					d.wallpaperFrost = next.wallpaperFrost;
					d.videoBlur = next.videoBlur;
					d.videoBrightness = next.videoBrightness;
					d.scrim = next.scrim;
					d.scrimBlur = next.scrimBlur;
					d.revision = revision;
				} }
			});
		}
		//#endregion
		//#region src/client/locales.ts
		/** `settings.nico` namespace dictionaries (the settings-row copy). */
		/** Dictionary namespace owned by this plugin. */
		const NS = "settings.nico";
		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"aqua.title": "Nico 玻璃主题",
			"aqua.description": "全局玻璃质感，云母/兼容双模式，材质、背景与颜色都可自由调节",
			"aqua.enable": "开启",
			"aqua.disable": "关闭",
			"aqua.mode": "模式",
			"aqua.modeMica": "玻璃",
			"aqua.modeCompat": "兼容",
			"aqua.materialGroup": "玻璃材质",
			"aqua.decorHover": "悬停效果",
			"aqua.blur": "玻璃模糊度",
			"aqua.brightness": "亮度",
			"aqua.refraction": "折射强度",
			"aqua.depth": "折射深度",
			"aqua.curvature": "边缘曲率",
			"aqua.dispersion": "边缘色散",
			"aqua.highlight": "边缘高光",
			"aqua.elasticity": "弹性",
			"aqua.elasticityStrength": "弹性强度",
			"aqua.fluidHue": "色调",
			"aqua.fluidDepth": "颜色深浅",
			"aqua.bgBrightness": "背景亮度",
			"aqua.bgBrightnessHintDark": "深色模式：0 压暗至纯黑，50 原样",
			"aqua.bgBrightnessHintLight": "浅色模式：50 原样，100 提亮至纯白",
			"aqua.background": "背景",
			"aqua.backgroundFluid": "流体",
			"aqua.backgroundWallpaper": "壁纸",
			"aqua.wallpaper": "壁纸",
			"aqua.wallpaperHint": "浅色壁纸用浅色模式，深色壁纸用深色模式⚠️",
			"aqua.chooseImage": "选择图片",
			"aqua.chooseVideo": "选择视频",
			"aqua.deleteWallpaper": "删除",
			"aqua.wallpaperBlur": "壁纸模糊度",
			"aqua.wallpaperFrost": "壁纸磨砂度",
			"aqua.videoBlur": "视频模糊度",
			"aqua.videoBrightness": "视频亮度",
			"aqua.videoHint": "⚠️视频会自动压暗以保证文字清晰，可用模糊度和亮度调节；刷新后未自动播放时点一下“选择视频”即可恢复",
			"aqua.scrimGroup": "对话垫层",
			"aqua.scrim": "垫层透明度",
			"aqua.scrimBlur": "垫层模糊",
			"aqua.pageTitle": "Nico 主题",
			"aqua.pageSubtitle": "独立设置页 — 集中调节玻璃材质与背景",
			"aqua.disabledNotice": "主题已关闭，开启后可在本页调节全部参数",
			"aqua.enableTheme": "开启主题",
			"aqua.disableTheme": "关闭主题"
		};
		/** English dictionary. */
		const en = {
			"aqua.title": "Nico glass theme",
			"aqua.description": "Global glassmorphism with mica/compatibility modes — material, backdrop, and color all adjustable",
			"aqua.enable": "On",
			"aqua.disable": "Off",
			"aqua.mode": "Mode",
			"aqua.modeMica": "Glass",
			"aqua.modeCompat": "Compatibility",
			"aqua.materialGroup": "Glass material",
			"aqua.decorHover": "Hover effects",
			"aqua.blur": "Glass blur",
			"aqua.brightness": "Brightness",
			"aqua.refraction": "Refraction strength",
			"aqua.depth": "Refraction depth",
			"aqua.curvature": "Edge curvature",
			"aqua.dispersion": "Chromatic dispersion",
			"aqua.highlight": "Rim highlight",
			"aqua.elasticity": "Elasticity",
			"aqua.elasticityStrength": "Elasticity strength",
			"aqua.fluidHue": "Hue",
			"aqua.fluidDepth": "Color depth",
			"aqua.bgBrightness": "Background brightness",
			"aqua.bgBrightnessHintDark": "Dark mode: 0 fades to pure black, 50 is unchanged",
			"aqua.bgBrightnessHintLight": "Light mode: 50 is unchanged, 100 brightens to pure white",
			"aqua.background": "Backdrop",
			"aqua.backgroundFluid": "Fluid",
			"aqua.backgroundWallpaper": "Wallpaper",
			"aqua.wallpaper": "Wallpaper",
			"aqua.wallpaperHint": "Use light mode for light wallpapers, dark mode for dark wallpapers ⚠️",
			"aqua.chooseImage": "Choose image",
			"aqua.chooseVideo": "Choose video",
			"aqua.deleteWallpaper": "Delete",
			"aqua.wallpaperBlur": "Wallpaper blur",
			"aqua.wallpaperFrost": "Wallpaper frost",
			"aqua.videoBlur": "Video blur",
			"aqua.videoBrightness": "Video brightness",
			"aqua.videoHint": "⚠️ The video is dimmed automatically to keep text readable — adjust blur and brightness here; if it does not play after a reload, click \"Choose video\" once to restore access",
			"aqua.scrimGroup": "Reading pad",
			"aqua.scrim": "Pad opacity",
			"aqua.scrimBlur": "Pad blur",
			"aqua.pageTitle": "Nico Theme",
			"aqua.pageSubtitle": "Dedicated settings page — glass material and backdrop controls",
			"aqua.disabledNotice": "Theme is off. Turn it on to tune everything here.",
			"aqua.enableTheme": "Enable theme",
			"aqua.disableTheme": "Disable theme"
		};
		//#endregion
		//#region src/client/ambient.ts
		/**
		* Ambient backdrop scene: the markup the layer injects behind the app frame.
		* The deepseek.com-style fluid board is the scene — one WebGL canvas filling
		* the viewport, with the wallpaper media in its own fixed layer (videos fail
		* to composite inside the ambient's animated opacity group).
		*/
		/**
		* The complete ambient scene markup: one fixed, click-transparent container
		* the layer prepends to <body> while enabled and removes on disable.
		*/
		const AMBIENT_SCENE = "<canvas data-dsh-aqua-fluid-canvas></canvas>";
		/** Build the ambient container element (or reuse an existing one). */
		function ensureAmbientScene() {
			const existing = document.querySelector("[data-dsh-aqua-ambient]");
			if (existing !== null) return existing;
			const holder = document.createElement("div");
			holder.innerHTML = `<div data-dsh-aqua-ambient aria-hidden="true">${AMBIENT_SCENE}</div>`;
			const node = holder.firstElementChild;
			if (!(node instanceof HTMLElement)) throw new Error("ui-aqua: ambient scene markup failed to parse");
			document.body.prepend(node);
			if (document.querySelector("[data-dsh-aqua-wallpaper-layer]") === null) {
				const wallpaper = document.createElement("div");
				wallpaper.setAttribute("data-dsh-aqua-wallpaper", "");
				wallpaper.setAttribute("data-dsh-aqua-wallpaper-layer", "");
				wallpaper.setAttribute("aria-hidden", "true");
				wallpaper.innerHTML = "<img data-dsh-aqua-wallpaper-img alt=\"\"><video data-dsh-aqua-wallpaper-video loop playsinline preload=\"auto\"></video>";
				document.body.prepend(wallpaper);
			}
			return node;
		}
		/** Remove the ambient container wherever it lives. */
		function removeAmbientScene() {
			for (const node of document.querySelectorAll("[data-dsh-aqua-ambient]")) node.remove();
			for (const node of document.querySelectorAll("[data-dsh-aqua-wallpaper-layer]")) node.remove();
		}
		/** Add the page edge-fade bands (5px gradient blur over the chat content). */
		function ensurePageFades() {
			if (document.querySelector("[data-dsh-aqua-fade]") !== null) return;
			const top = document.createElement("div");
			top.setAttribute("data-dsh-aqua-fade", "top");
			top.setAttribute("aria-hidden", "true");
			const bottom = document.createElement("div");
			bottom.setAttribute("data-dsh-aqua-fade", "bottom");
			bottom.setAttribute("aria-hidden", "true");
			const host = document.getElementById("root") ?? document.body;
			host.appendChild(top);
			host.appendChild(bottom);
		}
		/** Remove the edge-fade bands. */
		function removePageFades() {
			for (const el of document.querySelectorAll("[data-dsh-aqua-fade]")) el.remove();
		}
		//#endregion
		//#region src/client/fluid-shader.ts
		/** The exact default parameter set shipped by the site. */
		const SITE_FLUID_PARAMS = {
			mouseRadius: .22,
			mouseStrength: 1.1,
			decay: .96,
			distortBoost: 1.35,
			noiseBoost: 0,
			swirlBoost: .45,
			speed: 14,
			distortion: 20,
			swirl: 12,
			swirlIterations: 8,
			scale: .5,
			rotation: -5,
			proportion: 50,
			softness: 100,
			shapeScale: 10,
			offsetX: 0,
			offsetY: 65,
			color1: "#8AA3D6",
			color2: "#FFFFFF",
			color3: "#FFFFFF"
		};
		const VERTEX_SHADER = `#version 300 es
in vec4 a_position;
out vec2 vUv;
void main() {
  vUv = a_position.xy * 0.5 + 0.5;
  gl_Position = a_position;
}
`;
		const FLOW_SHADER = `#version 300 es
precision mediump float;
in vec2 vUv;
uniform sampler2D u_prev;
uniform vec2 u_mouse;
uniform vec2 u_velocity;
uniform float u_brushRadius;
uniform float u_brushStrength;
uniform float u_decay;
out vec4 fragColor;

void main() {
  vec4 prev = texture(u_prev, vUv);

  prev.r *= u_decay;
  prev.gb = mix(vec2(0.5), prev.gb, u_decay);

  float dist = distance(vUv, u_mouse);

  float influence = exp(-dist * dist / (u_brushRadius * u_brushRadius * 0.5));
  influence = max(0.0, influence - 0.01);

  float speed = length(u_velocity);
  float presenceStrength = u_brushStrength * 0.3;
  float velBonus = min(speed * 3.0, 0.7) * u_brushStrength;
  float totalStrength = presenceStrength + velBonus;

  prev.r = max(prev.r, influence * totalStrength);
  float blendAmt = influence * min(totalStrength, 0.4) * 0.3;
  prev.g = mix(prev.g, clamp(u_velocity.x * 2.0 + 0.5, 0.0, 1.0), blendAmt);
  prev.b = mix(prev.b, clamp(u_velocity.y * 2.0 + 0.5, 0.0, 1.0), blendAmt);

  fragColor = prev;
}
`;
		const DISPLAY_SHADER = `#version 300 es
precision mediump float;
in vec2 vUv;
uniform float u_time;
uniform float u_pixelRatio;
uniform vec2 u_resolution;
uniform float u_scale;
uniform float u_rotation;
uniform vec4 u_color1, u_color2, u_color3;
uniform float u_colorCount;
uniform float u_proportion;
uniform float u_softness;
uniform float u_shape;
uniform float u_shapeScale;
uniform float u_distortion;
uniform float u_swirl;
uniform float u_swirlIterations;
uniform vec2 u_offset;
uniform sampler2D u_flowmap;
uniform float u_distortBoost;
uniform float u_noiseBoost;
uniform float u_swirlBoost;
out vec4 fragColor;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

vec2 rotate(vec2 uv, float th) { return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv; }
float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123); }
float noise(vec2 st) {
  vec2 i = floor(st); vec2 f = fract(st);
  float a = random(i), b = random(i + vec2(1,0)), c = random(i + vec2(0,1)), d = random(i + vec2(1,1));
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}

vec3 blend_multi(float mixer, float softness) {
  float edge = 1.0 - softness;
  vec3 col = u_color1.rgb;
  if (u_colorCount > 1.5) { col = mix(col, u_color2.rgb, smoothstep(0.0 + 0.35*edge, 0.7 - 0.35*edge, mixer)); }
  if (u_colorCount > 2.5) { col = mix(col, u_color3.rgb, smoothstep(0.3 + 0.35*edge, 1.0 - 0.35*edge, mixer)); }
  return col;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float t = .5 * u_time;
  float ns = .0005 + .006 * u_scale;
  uv -= .5; uv *= (ns * u_resolution); uv = rotate(uv, u_rotation * .5 * PI);
  uv /= u_pixelRatio; uv += .5; uv += u_offset;

  vec2 fragUV = gl_FragCoord.xy / u_resolution.xy;
  vec4 flow = texture(u_flowmap, fragUV);
  float influence = flow.r;
  vec2 flowDir = (flow.gb - 0.5) * 2.0;

  float n1 = noise(uv + t), n2 = noise(uv*2. - t);
  float angle = n1 * TWO_PI;

  float totalDistortion = u_distortion + influence * u_distortBoost;
  uv.x += 4. * totalDistortion * n2 * cos(angle);
  uv.y += 4. * totalDistortion * n2 * sin(angle);

  uv += flowDir * influence * 0.15;

  if (influence > 0.001) {
    float localNoise = noise(uv * 2.0 + t * 1.5);
    uv += influence * u_noiseBoost * vec2(cos(localNoise * TWO_PI), sin(localNoise * TWO_PI));
  }

  float iters = ceil(clamp(u_swirlIterations, 1., 30.));
  float swirlAmt = clamp(u_swirl, 0., 2.) + influence * u_swirlBoost;
  for (float i = 1.; i <= 30.0; i++) {
    if (i > iters) break;
    uv.x += swirlAmt / i * cos(t + i*1.5*uv.y);
    uv.y += swirlAmt / i * cos(t + i*1.*uv.x);
  }

  float proportion = clamp(u_proportion, 0., 1.);
  vec2 cuv = uv * (.5 + 3.5 * u_shapeScale);
  float shape = .5 + .5 * sin(cuv.x) * cos(cuv.y);
  float mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
  vec3 col = blend_multi(mixer, clamp(u_softness, 0., 1.));
  fragColor = vec4(col, 1.0);
}
`;
		function hexToRgb(value) {
			const hex = value.replace("#", "");
			return [
				parseInt(hex.slice(0, 2), 16) / 255,
				parseInt(hex.slice(2, 4), 16) / 255,
				parseInt(hex.slice(4, 6), 16) / 255
			];
		}
		/**
		* Mount the fluid simulation on a canvas and run it until disposed.
		* @param canvas - full-size canvas element (CSS-sized by the ambient layer).
		* @param params - simulation parameters (site defaults are the natural input).
		* @returns the live handle.
		*/
		function attachFluidShader(canvas, params) {
			const gl = canvas.getContext("webgl2", {
				alpha: true,
				premultipliedAlpha: false,
				powerPreference: "low-power"
			});
			if (gl === null) return {
				setParams: () => {},
				stir: () => {},
				dispose: () => {}
			};
			const compile = (type, source) => {
				const shader = gl.createShader(type);
				if (shader === null) return null;
				gl.shaderSource(shader, source);
				gl.compileShader(shader);
				if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
					console.error("ui-aqua fluid shader:", gl.getShaderInfoLog(shader));
					return null;
				}
				return shader;
			};
			const link = (fragment) => {
				const vertex = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
				const frag = compile(gl.FRAGMENT_SHADER, fragment);
				if (vertex === null || frag === null) return null;
				const program = gl.createProgram();
				if (program === null) return null;
				gl.attachShader(program, vertex);
				gl.attachShader(program, frag);
				gl.linkProgram(program);
				if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
					console.error("ui-aqua fluid link:", gl.getProgramInfoLog(program));
					return null;
				}
				return program;
			};
			const flowProgram = link(FLOW_SHADER);
			const displayProgram = link(DISPLAY_SHADER);
			if (flowProgram === null || displayProgram === null) return {
				setParams: () => {},
				stir: () => {},
				dispose: () => {}
			};
			const flow = {
				prev: gl.getUniformLocation(flowProgram, "u_prev"),
				mouse: gl.getUniformLocation(flowProgram, "u_mouse"),
				velocity: gl.getUniformLocation(flowProgram, "u_velocity"),
				brushRadius: gl.getUniformLocation(flowProgram, "u_brushRadius"),
				brushStrength: gl.getUniformLocation(flowProgram, "u_brushStrength"),
				decay: gl.getUniformLocation(flowProgram, "u_decay")
			};
			const display = {
				time: gl.getUniformLocation(displayProgram, "u_time"),
				pixelRatio: gl.getUniformLocation(displayProgram, "u_pixelRatio"),
				resolution: gl.getUniformLocation(displayProgram, "u_resolution"),
				scale: gl.getUniformLocation(displayProgram, "u_scale"),
				rotation: gl.getUniformLocation(displayProgram, "u_rotation"),
				offset: gl.getUniformLocation(displayProgram, "u_offset"),
				color1: gl.getUniformLocation(displayProgram, "u_color1"),
				color2: gl.getUniformLocation(displayProgram, "u_color2"),
				color3: gl.getUniformLocation(displayProgram, "u_color3"),
				colorCount: gl.getUniformLocation(displayProgram, "u_colorCount"),
				proportion: gl.getUniformLocation(displayProgram, "u_proportion"),
				softness: gl.getUniformLocation(displayProgram, "u_softness"),
				shape: gl.getUniformLocation(displayProgram, "u_shape"),
				shapeScale: gl.getUniformLocation(displayProgram, "u_shapeScale"),
				distortion: gl.getUniformLocation(displayProgram, "u_distortion"),
				swirl: gl.getUniformLocation(displayProgram, "u_swirl"),
				swirlIterations: gl.getUniformLocation(displayProgram, "u_swirlIterations"),
				flowmap: gl.getUniformLocation(displayProgram, "u_flowmap"),
				distortBoost: gl.getUniformLocation(displayProgram, "u_distortBoost"),
				noiseBoost: gl.getUniformLocation(displayProgram, "u_noiseBoost"),
				swirlBoost: gl.getUniformLocation(displayProgram, "u_swirlBoost")
			};
			const quadBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
				-1,
				-1,
				1,
				-1,
				-1,
				1,
				1,
				1
			]), gl.STATIC_DRAW);
			const bindQuad = (program) => {
				const position = gl.getAttribLocation(program, "a_position");
				gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
				gl.enableVertexAttribArray(position);
				gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
			};
			const makeTarget = (width, height, initial) => {
				const tex = gl.createTexture();
				if (tex === null) throw new Error("ui-aqua fluid: texture allocation failed");
				gl.bindTexture(gl.TEXTURE_2D, tex);
				if (initial !== void 0) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, initial);
				else gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
				const fbo = gl.createFramebuffer();
				gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
				gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
				gl.bindFramebuffer(gl.FRAMEBUFFER, null);
				return {
					fbo,
					tex
				};
			};
			let width = 0;
			let height = 0;
			let flowWidth = 0;
			let flowHeight = 0;
			let flip = false;
			let current = { ...params };
			const pointer = {
				x: .5,
				y: .5,
				smoothX: .5,
				smoothY: .5,
				vx: 0,
				vy: 0,
				svx: 0,
				svy: 0
			};
			const dprCap = Math.min(window.devicePixelRatio || 1, 1.5);
			width = Math.round(canvas.clientWidth * dprCap);
			height = Math.round(canvas.clientHeight * dprCap);
			canvas.width = width;
			canvas.height = height;
			flowWidth = Math.round(width / 4);
			flowHeight = Math.round(height / 4);
			const initial = new Uint8Array(flowWidth * flowHeight * 4);
			for (let i = 0; i < flowWidth * flowHeight; i += 1) {
				initial[4 * i] = 0;
				initial[4 * i + 1] = 128;
				initial[4 * i + 2] = 128;
				initial[4 * i + 3] = 255;
			}
			let targetA = makeTarget(flowWidth, flowHeight, initial);
			let targetB = makeTarget(flowWidth, flowHeight, initial);
			const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
			const ua = navigator;
			const windows = ua.userAgentData ? ua.userAgentData.platform === "Windows" : navigator.userAgent.includes("Windows");
			const onMouseMove = (event) => {
				const rect = canvas.getBoundingClientRect();
				pointer.x = (event.clientX - rect.left) / rect.width;
				pointer.y = 1 - (event.clientY - rect.top) / rect.height;
			};
			if (!coarse && !windows) window.addEventListener("mousemove", onMouseMove);
			const start = performance.now();
			let raf = 0;
			let previous = 0;
			const step = 1e3 / 30;
			const frame = (now) => {
				raf = requestAnimationFrame(frame);
				if (now - previous < step) return;
				previous = now - (now - previous) % step;
				const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
				const nextWidth = Math.round(canvas.clientWidth * ratio);
				const nextHeight = Math.round(canvas.clientHeight * ratio);
				if (nextWidth !== width || nextHeight !== height) {
					width = nextWidth;
					height = nextHeight;
					canvas.width = width;
					canvas.height = height;
				}
				const p = current;
				const s = pointer;
				s.svx *= .94;
				s.svy *= .94;
				s.smoothX += (s.x - s.smoothX) * .12;
				s.smoothY += (s.y - s.smoothY) * .12;
				s.svx += ((s.x - s.smoothX) * .5 - s.svx) * .15;
				s.svy += ((s.y - s.smoothY) * .5 - s.svy) * .15;
				const read = flip ? targetA : targetB;
				const write = flip ? targetB : targetA;
				flip = !flip;
				gl.bindFramebuffer(gl.FRAMEBUFFER, write.fbo);
				gl.viewport(0, 0, flowWidth, flowHeight);
				gl.useProgram(flowProgram);
				bindQuad(flowProgram);
				gl.activeTexture(gl.TEXTURE0);
				gl.bindTexture(gl.TEXTURE_2D, read.tex);
				gl.uniform1i(flow.prev, 0);
				gl.uniform2f(flow.mouse, s.smoothX, s.smoothY);
				gl.uniform2f(flow.velocity, s.svx, s.svy);
				gl.uniform1f(flow.brushRadius, p.mouseRadius);
				gl.uniform1f(flow.brushStrength, p.mouseStrength);
				gl.uniform1f(flow.decay, p.decay);
				gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
				gl.bindFramebuffer(gl.FRAMEBUFFER, null);
				gl.viewport(0, 0, width, height);
				gl.useProgram(displayProgram);
				bindQuad(displayProgram);
				gl.activeTexture(gl.TEXTURE0);
				gl.bindTexture(gl.TEXTURE_2D, write.tex);
				gl.uniform1i(display.flowmap, 0);
				const time = (performance.now() - start) * .001 * (p.speed / 100);
				gl.uniform1f(display.time, time);
				gl.uniform1f(display.pixelRatio, window.devicePixelRatio || 1);
				gl.uniform2f(display.resolution, width, height);
				gl.uniform1f(display.scale, p.scale);
				gl.uniform1f(display.rotation, p.rotation / 90);
				gl.uniform2f(display.offset, p.offsetX / 100, p.offsetY / 100);
				const c1 = hexToRgb(p.color1 || "#2E58A4");
				const c2 = hexToRgb(p.color2 || "#D2E2EE");
				const c3 = hexToRgb(p.color3 || "#FFFFFF");
				gl.uniform4f(display.color1, c1[0], c1[1], c1[2], 1);
				gl.uniform4f(display.color2, c2[0], c2[1], c2[2], 1);
				gl.uniform4f(display.color3, c3[0], c3[1], c3[2], 1);
				gl.uniform1f(display.colorCount, 3);
				gl.uniform1f(display.proportion, p.proportion / 100);
				gl.uniform1f(display.softness, p.softness / 100);
				gl.uniform1f(display.shape, 0);
				gl.uniform1f(display.shapeScale, p.shapeScale / 100);
				gl.uniform1f(display.distortion, p.distortion / 100);
				gl.uniform1f(display.swirl, p.swirl / 50);
				gl.uniform1f(display.swirlIterations, p.swirlIterations);
				gl.uniform1f(display.distortBoost, p.distortBoost);
				gl.uniform1f(display.noiseBoost, p.noiseBoost);
				gl.uniform1f(display.swirlBoost, p.swirlBoost);
				gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
			};
			const handle = {
				setParams: (next) => {
					current = { ...next };
				},
				stir: (x, y, vx, vy) => {
					pointer.x += (x - pointer.x) * .35;
					pointer.y += (y - pointer.y) * .35;
					pointer.svx += (vx - pointer.svx) * .3;
					pointer.svy += (vy - pointer.svy) * .3;
				},
				dispose: () => {
					cancelAnimationFrame(raf);
					window.removeEventListener("mousemove", onMouseMove);
				}
			};
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				frame(performance.now());
				cancelAnimationFrame(raf);
				return handle;
			}
			raf = requestAnimationFrame(frame);
			return handle;
		}
		//#endregion
		//#region src/client/fluid-tones.ts
		/** hsl(h, s, l) → #rrggbb. */
		function hsl(h, s, l) {
			const c = (1 - Math.abs(2 * l - 1)) * s;
			const x = c * (1 - Math.abs(h / 60 % 2 - 1));
			const m = l - c / 2;
			let r = 0;
			let g = 0;
			let b = 0;
			if (h < 60) {
				r = c;
				g = x;
			} else if (h < 120) {
				r = x;
				g = c;
			} else if (h < 180) {
				g = c;
				b = x;
			} else if (h < 240) {
				g = x;
				b = c;
			} else if (h < 300) {
				r = x;
				b = c;
			} else {
				r = c;
				b = x;
			}
			const toHex = (v) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
			return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
		}
		/**
		* Palette for the given hue (0-360) and depth (0-100), per scheme.
		* The depth ramp is piecewise: the lower half sweeps from the absolute
		* extreme — pure black in dark mode, the deep saturated shade (e.g. #8B0000
		* for red) in light mode — up to the shipped mid look; the upper half
		* sweeps from mid to pale (#FFCCCB for red). Stepless HSL interpolation.
		*/
		function fluidToneColors(dark, hue, depth) {
			const h = ((hue + 217) % 360 + 360) % 360;
			const d = Math.min(1, Math.max(0, depth / 100));
			const ramp = (deep, mid, pale) => d < .5 ? deep + (mid - deep) * d / .5 : mid + (pale - mid) * (d - .5) / .5;
			if (dark) return {
				color1: hsl(h, .85, ramp(0, .46, .62)),
				color2: hsl(h, .9, ramp(0, .305, .45)),
				color3: hsl(h, .5, ramp(0, .075, .1))
			};
			return {
				color1: hsl(h, 1, ramp(.27, .45, .9)),
				color2: hsl(h, .55, .86),
				color3: hsl(h, .25, .955)
			};
		}
		//#endregion
		//#region src/client/fluid-interactions.ts
		/** Normalized shader-space coordinates for one canvas. */
		function uv(canvas, clientX, clientY) {
			const rect = canvas.getBoundingClientRect();
			return {
				x: rect.width <= 0 ? .5 : (clientX - rect.left) / rect.width,
				y: rect.height <= 0 ? .5 : 1 - (clientY - rect.top) / rect.height
			};
		}
		/**
		* Attach the button ripple listeners.
		* @param targets - the fluid handle and its canvas.
		* @returns disposer removing every listener.
		*/
		function attachFluidInteractions(targets) {
			const { main, mainCanvas } = targets;
			const lastStir = /* @__PURE__ */ new WeakMap();
			const ripples = /* @__PURE__ */ new Set();
			const stirButton = (button, strength) => {
				const now = performance.now();
				if (now - (lastStir.get(button) ?? 0) < 160) return;
				lastStir.set(button, now);
				const rect = button.getBoundingClientRect();
				const point = uv(mainCanvas, rect.left + rect.width / 2, rect.top + rect.height / 2);
				main.stir(point.x, point.y, 0, -strength);
			};
			/** Slow radial ripple: a ring of gentle outward stirs expanding from the
			*  click point. Radius eases from zero so the influence creeps outward. */
			const ripple = (cx, cy) => {
				const rect = mainCanvas.getBoundingClientRect();
				if (rect.width <= 0 || rect.height <= 0) return;
				const ux = (cx - rect.left) / rect.width;
				const uy = 1 - (cy - rect.top) / rect.height;
				const start = performance.now();
				const duration = 1500;
				const maxRadius = 120;
				const count = 8;
				const step = () => {
					const t = performance.now() - start;
					if (t > duration) return;
					const k = t / duration;
					const radius = maxRadius * k * k;
					const strength = .05 * (1 - k);
					const spin = .4 * k;
					for (let i = 0; i < count; i += 1) {
						const angle = i / count * Math.PI * 2 + spin;
						const px = ux + radius * Math.cos(angle) / rect.width;
						const py = uy + radius * Math.sin(angle) / rect.height;
						main.stir(px, py, Math.cos(angle) * strength, -Math.sin(angle) * strength);
					}
					const id = requestAnimationFrame(step);
					ripples.add(id);
				};
				const id = requestAnimationFrame(step);
				ripples.add(id);
			};
			const onPointerOver = (event) => {
				const button = event.target?.closest?.("button");
				if (button !== void 0 && button !== null) stirButton(button, .04);
			};
			const onClick = (event) => {
				const button = event.target?.closest?.("button");
				if (button === void 0 || button === null) return;
				const now = performance.now();
				if (now - (lastStir.get(button) ?? 0) < 500) return;
				lastStir.set(button, now);
				const rect = button.getBoundingClientRect();
				ripple(rect.left + rect.width / 2, rect.top + rect.height / 2);
			};
			document.addEventListener("pointerover", onPointerOver, { capture: true });
			document.addEventListener("click", onClick, { capture: true });
			return () => {
				for (const id of ripples) cancelAnimationFrame(id);
				ripples.clear();
				document.removeEventListener("pointerover", onPointerOver, { capture: true });
				document.removeEventListener("click", onClick, { capture: true });
			};
		}
		//#endregion
		//#region src/client/seam-stamper.ts
		const SEAMS = [
			{
				attribute: "data-dsh-frame",
				selector: ":has(> [class*=\"sidebarCol\"])"
			},
			{
				attribute: "data-dsh-sidebar-root",
				selector: "[class*=\"sidebarCol\"] [class*=\"root\"]",
				first: true
			},
			{
				attribute: "data-dsh-surface",
				selector: "button[class*=\"newSession\"]"
			},
			{
				attribute: "data-dsh-trajectory",
				selector: "[data-conversation-composer-overlay]"
			},
			{
				attribute: "data-dsh-details",
				selector: "[class*=\"detailsCol\"] [class*=\"root\"]",
				first: true
			},
			{
				attribute: "data-dsh-inputbar",
				selector: ":has(> [data-composer-card])"
			},
			{
				attribute: "data-dsh-add",
				selector: "[data-composer-card] [class*=\"add\"]"
			},
			{
				attribute: "data-dsh-stats",
				selector: "[data-slot=\"conversation.composer.dock\"] [class*=\"root\"]"
			},
			{
				attribute: "data-dsh-jobs",
				selector: "ul[aria-label=\"后台任务\"], ul[aria-label=\"Background jobs\"]"
			}
		];
		function stamp(seam) {
			if (seam.first) {
				const el = document.querySelector(seam.selector);
				if (el !== null && !el.hasAttribute(seam.attribute)) el.setAttribute(seam.attribute, "");
				return;
			}
			for (const el of document.querySelectorAll(seam.selector)) if (!el.hasAttribute(seam.attribute)) el.setAttribute(seam.attribute, "");
		}
		function stampAll() {
			for (const seam of SEAMS) stamp(seam);
		}
		/**
		* Stamp the seams once, then keep them stamped as React remounts nodes.
		* @returns a disposer that disconnects the observer.
		*/
		function startSeamStamper() {
			stampAll();
			const observer = new MutationObserver(() => {
				stampAll();
			});
			observer.observe(document.documentElement, {
				childList: true,
				subtree: true
			});
			return () => {
				observer.disconnect();
			};
		}
		//#endregion
		//#region \0dsh-global-css:H:\WorkProj\dsh-nico-theme\node_modules\.pnpm\nico-glass-kit@0.3.0_react-_9ef2f8fbfb9e5f1cf891bd988d901caf\node_modules\nico-glass-kit\dist\style.css.mjs
		const css$2 = ":root{--ngs-glass-tint:#12141a;--ngs-glass-tint-strength:.2;--ngs-radius-sm:12px;--ngs-radius-md:20px;--ngs-radius-lg:28px;--ngs-radius-capsule:999px;--ngs-transition-fast:.14s cubic-bezier(.2, .8, .2, 1);--ngs-transition:.24s cubic-bezier(.2, .8, .2, 1);--ngs-font-family:-apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;--ngs-tint-hover:#ffffff0d;--ngs-active-bg:#ffffff38;--ngs-text:#fffffff0;--ngs-text-dim:#ffffff9e;--ngs-focus-ring:#ffffffb3;--ngs-track:#ffffff2e;--ngs-fill:#ffffffeb;--ngs-fill-glass:#ffffff8c;--ngs-on-fill:#0f1118f2;--ngs-rail-fill:#ffffff8c;--ngs-knob-fill:#ffffff38;--ngs-tone-info:#60a5fa;--ngs-tone-success:#34d399;--ngs-tone-warning:#fbbf24;--ngs-tone-danger:#f87171;--ngs-rim-top:#ffffff80;--ngs-rim-top-soft:#ffffff29;--ngs-rim-edge:#ffffff47;--ngs-rim-bottom:#00000038;--ngs-shadow:0 10px 32px #00000057;--ngs-shadow-sm:0 4px 16px #00000047;--ngs-tint-fallback:#1a1c26e0}.ngs-surface[data-ngs-light=true]{--ngs-glass-tint:#fff;--ngs-tint-hover:#0000001a;--ngs-active-bg:#ffffffa8;--ngs-text:#0a0c14e0;--ngs-text-dim:#0a0c148f;--ngs-focus-ring:#0a0c1480;--ngs-track:#0a0c1424;--ngs-fill:#0a0c14d1;--ngs-fill-glass:#0a0c1480;--ngs-on-fill:#fffffff5;--ngs-rail-fill:#0a0c144d;--ngs-knob-fill:#0a0c1433;--ngs-tone-info:#1d4ed8;--ngs-tone-success:#047857;--ngs-tone-warning:#b45309;--ngs-tone-danger:#b91c1c;--ngs-rim-top:#ffffffe6;--ngs-rim-top-soft:#fff6;--ngs-rim-edge:#ffffffa6;--ngs-rim-bottom:#0000001a;--ngs-shadow:0 10px 32px #0f142829;--ngs-shadow-sm:0 4px 16px #0f14281f;--ngs-tint-fallback:#f4f6fceb}.ngs-surface{box-sizing:border-box;font-family:var(--ngs-font-family);color:var(--ngs-text);box-shadow:var(--ngs-shadow-sm);-webkit-tap-highlight-color:transparent;transition:color var(--ngs-transition),box-shadow var(--ngs-transition);display:inline-block;position:relative}.ngs-motion{border-radius:inherit;will-change:transform;flex-direction:column;width:100%;height:100%;display:flex;position:relative}.ngs-effect,.ngs-highlight{border-radius:inherit;pointer-events:none;position:absolute;inset:0}.ngs-effect{z-index:0;background:color-mix(in oklab,var(--ngs-glass-tint) calc(var(--ngs-glass-tint-strength) * 100%),transparent);transition:opacity var(--ngs-transition),background-color var(--ngs-transition)}@supports not (backdrop-filter:blur(1px)){.ngs-effect{background:var(--ngs-tint-fallback)}}.ngs-highlight{z-index:1;background:radial-gradient(200px circle at var(--ngx,50%) var(--ngy,50%),color-mix(in srgb,var(--ngs-highlight-color,#fff) calc(8% * var(--ngs-spec-o,0) * var(--ngs-hl,1)),transparent),transparent 70%);box-shadow:inset 0 1px 0 var(--ngs-rim-top-soft),inset 0 -1px 0 var(--ngs-rim-bottom);transition:box-shadow var(--ngs-transition)}.ngs-highlight:before{content:\"\";border-radius:inherit;background:linear-gradient(160deg,var(--ngs-rim-top) 0%,var(--ngs-rim-edge) 22%,#ffffff0a 45%,#ffffff05 60%,var(--ngs-rim-edge) 100%);-webkit-mask-composite:xor;opacity:calc(.8 * var(--ngs-hl,1) * (1 - .7 * var(--ngs-spec-o,0)));padding:1px;position:absolute;inset:0;-webkit-mask-image:linear-gradient(#000 0 0),linear-gradient(#000 0 0);mask-image:linear-gradient(#000 0 0),linear-gradient(#000 0 0);-webkit-mask-position:0 0,0 0;mask-position:0 0,0 0;-webkit-mask-size:auto,auto;mask-size:auto,auto;-webkit-mask-repeat:repeat,repeat;mask-repeat:repeat,repeat;-webkit-mask-clip:content-box,border-box;mask-clip:content-box,border-box;-webkit-mask-origin:content-box,border-box;mask-origin:content-box,border-box;mask-composite:exclude;mask-mode:match-source,match-source}.ngs-highlight:after{content:\"\";border-radius:inherit;background:radial-gradient(140px circle at var(--ngx,50%) var(--ngy,50%),color-mix(in srgb,var(--ngs-highlight-color,#fff) calc(65% * var(--ngs-spec-o,0) * var(--ngs-hl,1)),transparent),color-mix(in srgb,var(--ngs-highlight-color,#fff) calc(18% * var(--ngs-spec-o,0) * var(--ngs-hl,1)),transparent) 40%,transparent 70%);-webkit-mask-composite:xor;padding:2px;position:absolute;inset:0;-webkit-mask-image:linear-gradient(#000 0 0),linear-gradient(#000 0 0);mask-image:linear-gradient(#000 0 0),linear-gradient(#000 0 0);-webkit-mask-position:0 0,0 0;mask-position:0 0,0 0;-webkit-mask-size:auto,auto;mask-size:auto,auto;-webkit-mask-repeat:repeat,repeat;mask-repeat:repeat,repeat;-webkit-mask-clip:content-box,border-box;mask-clip:content-box,border-box;-webkit-mask-origin:content-box,border-box;mask-origin:content-box,border-box;mask-composite:exclude;mask-mode:match-source,match-source}.ngs-content{z-index:2;flex:auto;min-height:0;position:relative}.ngs-btn{font:inherit;cursor:pointer;-webkit-user-select:none;user-select:none;transition:transform var(--ngs-transition-fast),color var(--ngs-transition),box-shadow var(--ngs-transition);background:0 0;border:0;margin:0;padding:0}.ngs-btn:disabled{opacity:.45;cursor:default}.ngs-btn .ngs-effect{transition:opacity var(--ngs-transition),background-color var(--ngs-transition-fast)}.ngs-btn:not(:disabled):hover .ngs-effect{background-color:var(--ngs-tint-hover)}.ngs-btn:not(:disabled):active{transform:scale(.96)}.ngs-btn:focus-visible{outline:2px solid var(--ngs-focus-ring);outline-offset:2px}.ngs-btn-content{letter-spacing:.01em;white-space:nowrap;justify-content:center;align-items:center;gap:8px;width:100%;height:100%;font-weight:500;display:inline-flex}.ngs-btn-icon{flex:none;justify-content:center;align-items:center;display:inline-flex}.ngs-btn-icon svg{width:1.15em;height:1.15em;display:block}.ngs-btn--capsule.ngs-btn--sm .ngs-btn-content{padding:6px 14px;font-size:13px}.ngs-btn--capsule.ngs-btn--md .ngs-btn-content{padding:10px 20px;font-size:15px}.ngs-btn--capsule.ngs-btn--lg .ngs-btn-content{padding:14px 28px;font-size:17px}.ngs-btn--icon.ngs-btn--sm{width:32px;height:32px;font-size:14px}.ngs-btn--icon.ngs-btn--md{width:40px;height:40px;font-size:17px}.ngs-btn--icon.ngs-btn--lg{width:52px;height:52px;font-size:21px}.ngs-card{box-shadow:var(--ngs-shadow);display:block}.ngs-navbar{z-index:100;display:block;position:fixed;top:12px;left:16px;right:16px}.ngs-navbar-inner{align-items:center;gap:12px;min-height:28px;padding:10px 16px;display:flex}.ngs-navbar-side{flex:1 1 0;align-items:center;gap:8px;min-width:0;display:flex}.ngs-navbar-side--trailing{justify-content:flex-end}.ngs-navbar-title{letter-spacing:.01em;text-align:center;white-space:nowrap;text-overflow:ellipsis;flex:0 auto;font-size:15px;font-weight:600;overflow:hidden}.ngs-tabbar{z-index:100;position:fixed;bottom:16px;left:50%;transform:translate(-50%)}.ngs-tabbar-inner{align-items:center;gap:4px;padding:6px;display:flex}.ngs-tab{-webkit-appearance:none;-moz-appearance:none;appearance:none;font:inherit;color:var(--ngs-text-dim);cursor:pointer;min-width:64px;transition:color var(--ngs-transition-fast),background-color var(--ngs-transition-fast),transform var(--ngs-transition-fast);background:0 0;border:0;border-radius:999px;flex-direction:column;justify-content:center;align-items:center;gap:3px;margin:0;padding:8px 16px;display:flex}.ngs-tab:active{transform:scale(.95)}.ngs-tab:focus-visible{outline:2px solid var(--ngs-focus-ring);outline-offset:2px}.ngs-tab--active{color:var(--ngs-text);background:var(--ngs-active-bg);box-shadow:inset 0 1px 0 var(--ngs-rim-top-soft),inset 0 -1px 0 var(--ngs-rim-bottom)}.ngs-tab-icon{line-height:0;display:inline-flex}.ngs-tab-icon svg{width:20px;height:20px;display:block}.ngs-tab-label{letter-spacing:.02em;font-size:10px;font-weight:500}.ngs-pill{z-index:200;animation:.32s cubic-bezier(.2,.9,.25,1.2) both ngs-pill-in;position:fixed;top:16px;left:50%}.ngs-pill--leaving{animation:.32s cubic-bezier(.4,0,.6,1) both ngs-pill-out}@keyframes ngs-pill-in{0%{transform:translate(-50%)translateY(-18px)scale(.9)}to{transform:translate(-50%)translateY(0)scale(1)}}@keyframes ngs-pill-out{0%{transform:translate(-50%)translateY(0)scale(1)}to{transform:translate(-50%)translateY(-18px)scale(.9)}}.ngs-pill-inner{align-items:center;gap:8px;padding:8px 16px;display:inline-flex}.ngs-pill-icon{line-height:0;display:inline-flex}.ngs-pill-icon svg{width:16px;height:16px;display:block}.ngs-pill-texts{white-space:nowrap;align-items:baseline;gap:6px;display:inline-flex}.ngs-pill-primary{letter-spacing:.01em;font-size:14px;font-weight:600}.ngs-pill-secondary{color:var(--ngs-text-dim);font-size:12px}.ngs-input{cursor:text;min-width:160px;display:inline-block}.ngs-input-inner{align-items:center;gap:8px;display:flex}.ngs-input--sm .ngs-input-inner{min-height:32px;padding:6px 12px;font-size:13px}.ngs-input--md .ngs-input-inner{min-height:40px;padding:9px 14px;font-size:14px}.ngs-input--lg .ngs-input-inner{min-height:48px;padding:12px 18px;font-size:16px}.ngs-input-field{width:100%;min-width:0;color:inherit;font:inherit;letter-spacing:inherit;background:0 0;border:0;outline:0;flex:auto;margin:0;padding:0}.ngs-input-field::placeholder{color:var(--ngs-text-dim)}.ngs-input-field:-webkit-autofill{-webkit-text-fill-color:var(--ngs-text)}.ngs-input-affix{color:var(--ngs-text-dim);flex:none;line-height:0;display:inline-flex}.ngs-input-affix svg{width:1.15em;height:1.15em;display:block}.ngs-input-affix button{all:unset;cursor:pointer;line-height:0;display:inline-flex}.ngs-input:focus-within{outline:2px solid var(--ngs-focus-ring);outline-offset:2px}.ngs-input[data-invalid=true]{--ngs-focus-ring:var(--ngs-tone-danger);--ngs-glass-tint:var(--ngs-tone-danger);--ngs-glass-tint-strength:.28;--ngs-highlight-color:var(--ngs-tone-danger);--ngs-rim-top:color-mix(in srgb, var(--ngs-tone-danger) 82%, transparent);--ngs-rim-top-soft:color-mix(in srgb, var(--ngs-tone-danger) 40%, transparent);--ngs-rim-edge:color-mix(in srgb, var(--ngs-tone-danger) 55%, transparent)}.ngs-input[data-invalid=true] .ngs-input-affix{color:var(--ngs-tone-danger)}.ngs-input[data-disabled=true]{opacity:.55;cursor:default}.ngs-select{vertical-align:middle;min-width:160px;display:inline-block;position:relative}.ngs-select-trigger{width:100%;font:inherit;text-align:left;cursor:pointer;-webkit-user-select:none;user-select:none;background:0 0;border:0;margin:0;padding:0}.ngs-select-trigger:disabled{opacity:.55;cursor:default}.ngs-select-trigger:focus-visible{outline:2px solid var(--ngs-focus-ring);outline-offset:2px}.ngs-select-trigger:not(:disabled):hover .ngs-effect{background-color:var(--ngs-tint-hover)}.ngs-select-trigger-inner{align-items:center;gap:8px;width:100%;display:flex}.ngs-select--sm .ngs-select-trigger-inner{min-height:32px;padding:6px 12px;font-size:13px}.ngs-select--md .ngs-select-trigger-inner{min-height:40px;padding:9px 14px;font-size:14px}.ngs-select--lg .ngs-select-trigger-inner{min-height:48px;padding:12px 18px;font-size:16px}.ngs-select-value{white-space:nowrap;text-overflow:ellipsis;flex:auto;min-width:0;overflow:hidden}.ngs-select[data-placeholder=true] .ngs-select-value{color:var(--ngs-text-dim)}.ngs-select-affix,.ngs-select-chevron{color:var(--ngs-text-dim);flex:none;line-height:0;display:inline-flex}.ngs-select-affix svg{width:1.15em;height:1.15em;display:block}.ngs-select-chevron{transition:transform var(--ngs-transition-fast)}.ngs-select-chevron svg{width:1em;height:1em;display:block}.ngs-select[data-open=true] .ngs-select-chevron{transform:rotate(180deg)}.ngs-select-popup{z-index:50;--ngs-select-list-pad:5px;transform-origin:top;width:max-content;min-width:100%;max-width:280px;animation:.15s cubic-bezier(.2,.9,.25,1.1) both ngs-select-pop-in;position:absolute;top:calc(100% + 8px);left:0;overflow:hidden}.ngs-select-list{padding:var(--ngs-select-list-pad);flex-direction:column;gap:2px;display:flex}.ngs-select-option{-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:max(4px,calc(var(--ngs-select-radius,14px) - var(--ngs-select-list-pad)));width:100%;min-height:32px;color:var(--ngs-text);font:inherit;text-align:left;white-space:nowrap;cursor:pointer;transition:background-color var(--ngs-transition-fast),color var(--ngs-transition-fast);background:0 0;border:0;align-items:center;gap:10px;margin:0;padding:6px 10px;font-size:13px;display:flex}.ngs-select-popup--sm{--ngs-select-list-pad:4px}.ngs-select-popup--sm .ngs-select-list{gap:1px}.ngs-select-popup--sm .ngs-select-option{min-height:28px;padding:4px 9px;font-size:12px}.ngs-select-popup--lg{--ngs-select-list-pad:6px}.ngs-select-popup--lg .ngs-select-list{gap:3px}.ngs-select-popup--lg .ngs-select-option{min-height:40px;padding:9px 13px;font-size:15px}.ngs-select-option-label{text-overflow:ellipsis;flex:auto;min-width:0;overflow:hidden}.ngs-select-option:hover:not(:disabled),.ngs-select-option.is-active:not(:disabled){background:var(--ngs-tint-hover)}.ngs-select-option[aria-selected=true]{background:var(--ngs-active-bg)}.ngs-select-option:disabled{opacity:.45;cursor:default}.ngs-select-option-check{flex:none;line-height:0;display:inline-flex}.ngs-select-option-check svg{width:14px;height:14px;display:block}@keyframes ngs-select-pop-in{0%{transform:translateY(-6px)scale(.98)}to{transform:translateY(0)scale(1)}}.ngs-switch{font:inherit;cursor:pointer;-webkit-user-select:none;user-select:none;transition:transform var(--ngs-transition-fast),color var(--ngs-transition),box-shadow var(--ngs-transition);background:0 0;border:0;margin:0;padding:0}.ngs-switch:disabled{opacity:.45;cursor:default}.ngs-switch:not(:disabled):active{transform:scale(.97)}.ngs-switch:focus-visible{outline:2px solid var(--ngs-focus-ring);outline-offset:2px}.ngs-switch-inner{display:block;position:relative}.ngs-switch--sm{--ngs-switch-pad:3px;--ngs-switch-r:10px;--ngs-switch-shift:16px}.ngs-switch--sm .ngs-switch-inner{width:42px;height:26px;padding:3px}.ngs-switch--md{--ngs-switch-pad:3px;--ngs-switch-r:13px;--ngs-switch-shift:20px}.ngs-switch--md .ngs-switch-inner{width:52px;height:32px;padding:3px}.ngs-switch--lg{--ngs-switch-pad:4px;--ngs-switch-r:15px;--ngs-switch-shift:24px}.ngs-switch--lg .ngs-switch-inner{width:62px;height:38px;padding:4px}.ngs-switch-rail{inset:var(--ngs-switch-pad);border-radius:999px;position:absolute;overflow:hidden;box-shadow:inset 0 1px 1.5px #0000004d,inset 0 -1px .5px #ffffff38}.ngs-switch-fill{width:var(--ngs-switch-r);background:var(--ngs-rail-fill);-webkit-mask:radial-gradient(circle var(--ngs-switch-r) at 100% 50%,transparent calc(var(--ngs-switch-r) - .5px),#000 var(--ngs-switch-r));mask:radial-gradient(circle var(--ngs-switch-r) at 100% 50%,transparent calc(var(--ngs-switch-r) - .5px),#000 var(--ngs-switch-r));transition:width var(--ngs-transition-fast),background-color var(--ngs-transition);position:absolute;top:0;bottom:0;left:0;box-shadow:inset 0 1px 1.5px #0000004d,inset 0 -1px .5px #ffffff38}.ngs-switch[aria-checked=true] .ngs-switch-fill{width:calc(var(--ngs-switch-r) + var(--ngs-switch-shift))}.ngs-switch-knob{top:var(--ngs-switch-pad);left:var(--ngs-switch-pad);width:calc(2 * var(--ngs-switch-r));height:calc(2 * var(--ngs-switch-r));background:var(--ngs-knob-fill);transition:transform var(--ngs-transition-fast),background-color var(--ngs-transition);border-radius:999px;position:absolute;box-shadow:0 2px 6px #00000052,0 .5px 1px #0003,inset 0 1px .5px #ffffffb3,inset 0 -1px 1px #00000024}.ngs-switch[aria-checked=true] .ngs-switch-knob{transform:translate(var(--ngs-switch-shift))}.ngs-checkbox{font:inherit;cursor:pointer;-webkit-user-select:none;user-select:none;transition:transform var(--ngs-transition-fast),color var(--ngs-transition),box-shadow var(--ngs-transition);background:0 0;border:0;margin:0;padding:0}.ngs-checkbox:disabled{opacity:.45;cursor:default}.ngs-checkbox:not(:disabled):active{transform:scale(.94)}.ngs-checkbox:focus-visible{outline:2px solid var(--ngs-focus-ring);outline-offset:2px}.ngs-checkbox-inner{justify-content:center;align-items:center;display:flex;position:relative}.ngs-checkbox--sm .ngs-checkbox-inner{width:18px;height:18px}.ngs-checkbox--md .ngs-checkbox-inner{width:24px;height:24px}.ngs-checkbox--lg .ngs-checkbox-inner{width:30px;height:30px}.ngs-checkbox-mark{background:var(--ngs-fill-glass);opacity:0;transition:opacity var(--ngs-transition-fast),transform var(--ngs-transition-fast);border-radius:999px;position:absolute;inset:3px;transform:scale(.55);box-shadow:inset 0 1px .5px #fff9,inset 0 -1px 1px #00000024}.ngs-checkbox[aria-checked=true] .ngs-checkbox-mark{opacity:1;transform:scale(1)}.ngs-checkbox-glyph{z-index:1;width:60%;height:60%;color:var(--ngs-on-fill);opacity:0;transition:opacity var(--ngs-transition-fast),transform var(--ngs-transition-fast);position:relative;transform:scale(.6)}.ngs-checkbox[aria-checked=true] .ngs-checkbox-glyph{opacity:1;transform:scale(1)}.ngs-slider{min-width:180px;display:inline-block}.ngs-slider--md{--ngs-slider-track-h:24px;--ngs-slider-half:12px;--ngs-slider-pad:4px}.ngs-slider--sm{--ngs-slider-track-h:20px;--ngs-slider-half:10px;--ngs-slider-pad:3px}.ngs-slider-inner{padding:var(--ngs-slider-pad);align-items:center;display:flex;position:relative}.ngs-slider-rail{inset:var(--ngs-slider-pad);border-radius:var(--ngs-slider-radius,999px);pointer-events:none;position:absolute;overflow:hidden}.ngs-slider-fill{width:calc(var(--ngs-slider-half) + (100% - var(--ngs-slider-track-h)) * var(--ngs-slider-f,0));background:var(--ngs-rail-fill);transition:background-color var(--ngs-transition);-webkit-mask:radial-gradient(circle var(--ngs-slider-half) at 100% 50%,transparent calc(var(--ngs-slider-half) - .5px),#000 var(--ngs-slider-half));mask:radial-gradient(circle var(--ngs-slider-half) at 100% 50%,transparent calc(var(--ngs-slider-half) - .5px),#000 var(--ngs-slider-half));position:absolute;top:0;bottom:0;left:0}.ngs-slider-field{z-index:1;-webkit-appearance:none;-moz-appearance:none;appearance:none;width:100%;min-width:0;height:var(--ngs-slider-track-h);cursor:pointer;background:0 0;flex:auto;margin:0;padding:0;display:block;position:relative}.ngs-slider-field:disabled{cursor:default}.ngs-slider-field::-webkit-slider-runnable-track{height:var(--ngs-slider-track-h);border-radius:var(--ngs-slider-radius,999px);background:0 0;box-shadow:inset 0 1px 1.5px #0000004d,inset 0 -1px .5px #ffffff38}.ngs-slider-field::-webkit-slider-thumb{-webkit-appearance:none;-moz-appearance:none;appearance:none;width:var(--ngs-slider-track-h);height:var(--ngs-slider-track-h);background:var(--ngs-knob-fill);border:0;border-radius:50%;margin-top:0;box-shadow:0 2px 7px #0000006b,0 .5px 1px #00000047,inset 0 1px 1px #ffffffd9,inset 0 -1.5px 2px #0003}.ngs-slider-field::-moz-range-track{height:var(--ngs-slider-track-h);border-radius:var(--ngs-slider-radius,999px);background:0 0;box-shadow:inset 0 1px 1.5px #0000004d,inset 0 -1px .5px #ffffff38}.ngs-slider-field::-moz-range-progress{background:0 0}.ngs-slider-field::-moz-range-thumb{width:var(--ngs-slider-track-h);height:var(--ngs-slider-track-h);background:var(--ngs-knob-fill);border:0;border-radius:50%;box-shadow:0 2px 7px #0000006b,0 .5px 1px #00000047,inset 0 1px 1px #ffffffd9,inset 0 -1.5px 2px #0003}.ngs-slider-field:focus-visible{outline:none}.ngs-slider:has(.ngs-slider-field:focus-visible){outline:2px solid var(--ngs-focus-ring);outline-offset:2px}.ngs-slider[data-disabled=true]{opacity:.55}.ngs-segmented{display:inline-block}.ngs-segmented-inner{align-items:center;gap:2px;padding:4px;display:flex}.ngs-segment{-webkit-appearance:none;-moz-appearance:none;appearance:none;font:inherit;color:var(--ngs-text-dim);cursor:pointer;white-space:nowrap;transition:color var(--ngs-transition-fast),background-color var(--ngs-transition-fast),transform var(--ngs-transition-fast);background:0 0;border:0;border-radius:999px;justify-content:center;align-items:center;gap:6px;margin:0;display:inline-flex}.ngs-segmented--sm .ngs-segment{min-width:52px;padding:5px 12px;font-size:12px}.ngs-segmented--md .ngs-segment{min-width:64px;padding:7px 16px;font-size:13px}.ngs-segment:active{transform:scale(.96)}.ngs-segment:focus-visible{outline:2px solid var(--ngs-focus-ring);outline-offset:2px}.ngs-segment--active{color:var(--ngs-text);background:var(--ngs-active-bg);box-shadow:inset 0 1px 0 var(--ngs-rim-top-soft),inset 0 -1px 0 var(--ngs-rim-bottom)}.ngs-segment-icon{line-height:0;display:inline-flex}.ngs-segment-icon svg{width:1.1em;height:1.1em;display:block}.ngs-badge{--ngs-badge-tone:var(--ngs-text-dim);display:inline-block}.ngs-badge[data-tone=info]{--ngs-badge-tone:var(--ngs-tone-info)}.ngs-badge[data-tone=success]{--ngs-badge-tone:var(--ngs-tone-success)}.ngs-badge[data-tone=warning]{--ngs-badge-tone:var(--ngs-tone-warning)}.ngs-badge[data-tone=danger]{--ngs-badge-tone:var(--ngs-tone-danger)}.ngs-badge-inner{white-space:nowrap;align-items:center;gap:6px;display:inline-flex}.ngs-badge--sm .ngs-badge-inner{min-height:20px;padding:2px 8px;font-size:11px}.ngs-badge--md .ngs-badge-inner{min-height:24px;padding:4px 10px;font-size:12px}.ngs-badge-dot{background:var(--ngs-badge-tone);width:6px;height:6px;box-shadow:0 0 6px var(--ngs-badge-tone);border-radius:50%;flex:none}.ngs-badge--sm .ngs-badge-dot{width:5px;height:5px}.ngs-badge-text{letter-spacing:.01em;font-weight:500}.ngs-avatar{vertical-align:middle;display:inline-block}.ngs-avatar-inner{border-radius:inherit;justify-content:center;align-items:center;display:flex;position:relative;overflow:hidden}.ngs-avatar-img{object-fit:cover;-webkit-user-select:none;user-select:none;border-radius:50%;width:calc(100% - 4px);height:calc(100% - 4px);position:absolute;top:2px;left:2px}.ngs-avatar-initials{letter-spacing:.02em;color:var(--ngs-text);-webkit-user-select:none;user-select:none;font-weight:600;line-height:1}.ngs-progress{width:240px;max-width:100%;display:block}.ngs-progress-inner{border-radius:999px;align-items:stretch;display:flex;overflow:hidden;box-shadow:inset 0 1px 1.5px #0000004d,inset 0 -1px .5px #ffffff38}.ngs-progress--sm .ngs-progress-inner{height:8px}.ngs-progress--md .ngs-progress-inner{height:12px}.ngs-progress--lg .ngs-progress-inner{height:16px}.ngs-progress-fill{background:var(--ngs-rail-fill);transition:width var(--ngs-transition),background-color var(--ngs-transition);border-radius:999px;flex:none;box-shadow:inset 0 1px 1.5px #0000004d,inset 0 -1px .5px #ffffff38}.ngs-spinner{vertical-align:middle;display:inline-block}.ngs-spinner-inner{display:block;position:relative}.ngs-spinner--sm .ngs-spinner-inner{width:32px;height:32px}.ngs-spinner--md .ngs-spinner-inner{width:40px;height:40px}.ngs-spinner--lg .ngs-spinner-inner{width:52px;height:52px}.ngs-spinner-ring{box-sizing:border-box;border:2.5px solid var(--ngs-track);border-top-color:var(--ngs-fill);border-radius:50%;animation:.85s linear infinite ngs-spinner-rotate;position:absolute;inset:8px}.ngs-spinner--sm .ngs-spinner-ring{border-width:2px;inset:7px}.ngs-spinner--lg .ngs-spinner-ring{border-width:3px;inset:10px}@keyframes ngs-spinner-rotate{to{transform:rotate(360deg)}}.ngs-alert{--ngs-alert-tone:var(--ngs-text-dim);display:inline-block}.ngs-alert[data-tone=info]{--ngs-alert-tone:var(--ngs-tone-info)}.ngs-alert[data-tone=success]{--ngs-alert-tone:var(--ngs-tone-success)}.ngs-alert[data-tone=warning]{--ngs-alert-tone:var(--ngs-tone-warning)}.ngs-alert[data-tone=danger]{--ngs-alert-tone:var(--ngs-tone-danger)}.ngs-alert-inner{align-items:flex-start;gap:12px;max-width:560px;padding:14px 16px;display:flex}.ngs-alert-icon{color:var(--ngs-alert-tone);flex:none;margin-top:1px;line-height:0;display:inline-flex}.ngs-alert-icon svg{width:20px;height:20px;display:block}.ngs-alert-texts{flex:auto;min-width:0}.ngs-alert-title{letter-spacing:.01em;font-size:14px;font-weight:600}.ngs-alert-body{color:var(--ngs-text-dim);margin-top:2px;font-size:13px;line-height:1.55}.ngs-alert-close{-webkit-appearance:none;-moz-appearance:none;appearance:none;color:var(--ngs-text-dim);cursor:pointer;transition:background-color var(--ngs-transition-fast),color var(--ngs-transition-fast);background:0 0;border:0;border-radius:50%;flex:none;margin:-2px -4px 0 0;padding:5px;line-height:0}.ngs-alert-close:hover{background:var(--ngs-tint-hover);color:var(--ngs-text)}.ngs-alert-close:focus-visible{outline:2px solid var(--ngs-focus-ring);outline-offset:2px}.ngs-alert-close svg{width:14px;height:14px;display:block}.ngs-modal-overlay{z-index:500;justify-content:center;align-items:center;padding:24px;display:flex;position:fixed;inset:0}.ngs-modal-overlay:before{content:\"\";background:#080a106b;animation:.2s ngs-modal-fade-in;position:absolute;inset:0}.ngs-modal-overlay:focus{outline:none}.ngs-modal-overlay.is-leaving:before{animation:.2s forwards ngs-modal-fade-out}.ngs-modal-panel{flex-direction:column;max-height:calc(100vh - 48px);animation:.26s cubic-bezier(.2,.9,.25,1.15) both ngs-modal-pop-in;display:flex;overflow:hidden}.ngs-modal-panel .ngs-motion{flex:auto;height:auto;min-height:0}.ngs-modal-panel .ngs-content{min-height:0;overflow:auto}.ngs-modal-overlay.is-leaving .ngs-modal-panel{animation:.2s cubic-bezier(.4,0,.6,1) both ngs-modal-pop-out}.ngs-modal-head{align-items:center;gap:12px;padding:18px 20px 0;display:flex}.ngs-modal-title{letter-spacing:.01em;flex:auto;min-width:0;margin:0;font-size:17px;font-weight:700}.ngs-modal-close{-webkit-appearance:none;-moz-appearance:none;appearance:none;color:var(--ngs-text-dim);cursor:pointer;transition:background-color var(--ngs-transition-fast),color var(--ngs-transition-fast);background:0 0;border:0;border-radius:50%;flex:none;margin:-4px -6px 0 0;padding:6px;line-height:0}.ngs-modal-close:hover{background:var(--ngs-tint-hover);color:var(--ngs-text)}.ngs-modal-close:focus-visible{outline:2px solid var(--ngs-focus-ring);outline-offset:2px}.ngs-modal-close svg{width:15px;height:15px;display:block}.ngs-modal-body{color:var(--ngs-text-dim);padding:14px 20px 6px;font-size:14px;line-height:1.65}.ngs-modal-foot{justify-content:flex-end;align-items:center;gap:10px;padding:10px 20px 18px;display:flex}@keyframes ngs-modal-fade-in{0%{opacity:0}to{opacity:1}}@keyframes ngs-modal-fade-out{0%{opacity:1}to{opacity:0}}@keyframes ngs-modal-pop-in{0%{transform:translateY(14px)scale(.96)}to{transform:translateY(0)scale(1)}}@keyframes ngs-modal-pop-out{0%{transform:translateY(0)scale(1)}to{transform:translateY(8px)scale(.97)}}.ngs-tooltip-wrap{display:inline-flex;position:relative}.ngs-tooltip{z-index:600;pointer-events:none;position:absolute}.ngs-tooltip--top{bottom:calc(100% + 10px);left:50%;transform:translate(-50%)}.ngs-tooltip--bottom{top:calc(100% + 10px);left:50%;transform:translate(-50%)}.ngs-tooltip--left{top:50%;right:calc(100% + 10px);transform:translateY(-50%)}.ngs-tooltip--right{top:50%;left:calc(100% + 10px);transform:translateY(-50%)}.ngs-tooltip-inner{letter-spacing:.01em;white-space:nowrap;padding:6px 10px;font-size:12px;line-height:1.4;display:block}";
		const tagId$2 = "dsh-nico-theme/style.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$2) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-nico-theme";
			tag.dataset.pluginCss = tagId$2;
			tag.textContent = css$2;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region src/client/glass-panes.tsx
		/**
		* Glass pane layer: nico-glass-kit owns the material of every DSH panel.
		*
		* DSH keeps owning its React tree, layout and interactions; this layer only
		* injects an underlay as the host's first child and portals a `GlassSurface`
		* into it. The host loses its own paint (background / border / shadow /
		* backdrop-filter) through the stylesheet, so the kit surface is the single
		* owner of the material.
		*
		* The provider lives in a hidden 0×0 root (rendered, never `display: none` —
		* the kit's SVG filter registry renders inside it). Elasticity is the kit's
		* own spring: it only translates `.ngs-motion`, so the pointer feed comes
		* from the host and the same offset is mirrored onto the host's content boxes
		* to make the panel lean as one piece. Only moves that land on the pane's own
		* box are fed — floating overlays are fixed DOM descendants of a host (the
		* settings dialog lives inside the sidebar column) and their moves would
		* otherwise drag the glass toward a pointer that is nowhere near it. Panes
		* whose host clips its own overflow stay rigid (a leaning surface would be
		* cut off by the host).
		*/
		/** Marker attribute on a pane host. */
		const PANE_ATTRIBUTE = "data-dsh-nico-pane";
		/** Marker attribute on the injected underlay. */
		const SURFACE_ATTRIBUTE = "data-dsh-nico-pane-surface";
		/** Marker on a host content element carrying a mirrored lean offset. */
		const LEAN_ATTRIBUTE = "data-dsh-nico-lean";
		/** Marker on the hidden provider root. */
		const HOST_ATTRIBUTE = "data-dsh-nico-glass-host";
		/** Uniform pane corner radius (the playground default). */
		const PANE_RADIUS = 32;
		/** Kit lens-map raster scale: the kit default, kept explicit for the budget. */
		const LENS_MAP_RASTER_SCALE = .2;
		/** Frames of extra sync after the last DOM/layout kick (mount animations). */
		const SETTLE_FRAMES = 6;
		function first(selector) {
			const el = document.querySelector(selector);
			return el instanceof HTMLElement ? el : null;
		}
		function sessionHeader() {
			return first("[data-phase=\"active\"] header") ?? first("[data-dsh-float] header:not([class*=\"headerHidden\"])") ?? first("[data-dsh-float] header") ?? first("header");
		}
		/** The 14 panes, in the same coverage the hand-drawn glass used to have. */
		const PANE_DEFS = [
			{
				key: "sidebar",
				select: () => first("[class*=\"sidebarCol\"]")
			},
			{
				key: "new-session",
				select: () => first("[data-dsh-surface]")
			},
			{
				key: "header",
				select: sessionHeader
			},
			{
				key: "composer",
				select: () => first("[data-dsh-inputbar]:has([data-dsh-stats])") ?? first("[data-composer-card]")
			},
			{
				key: "trajectory",
				select: () => first("[data-dsh-trajectory]")
			},
			{
				key: "dock",
				select: () => {
					const dock = first("[data-dsh-stats]");
					return dock !== null && dock.closest("[data-dsh-inputbar]") === null ? dock : null;
				}
			},
			{
				key: "dialog",
				select: () => first("[role=\"dialog\"]")
			},
			{
				key: "todo",
				select: () => first("[data-testid=\"todo-panel\"]")
			},
			{
				key: "goal",
				select: () => first("[data-goal-bar] > *")
			},
			{
				key: "question",
				select: () => first("[data-question-key] > section")
			},
			{
				key: "plan-review",
				select: () => first("[data-plan-review-key] > section")
			},
			{
				key: "approval",
				select: () => first("[data-approval-key] > *")
			},
			{
				key: "queue",
				select: () => first("[data-queue-dock] > *")
			},
			{
				key: "jobs",
				select: () => first("[data-dsh-jobs]")
			}
		];
		const elementIds = /* @__PURE__ */ new WeakMap();
		let nextElementId = 1;
		function identityOf(el) {
			const known = elementIds.get(el);
			if (known !== void 0) return known;
			const id = nextElementId;
			nextElementId += 1;
			elementIds.set(el, id);
			return id;
		}
		/**
		* Whether the host clips its own overflow. `overflow` is static for these
		* hosts, so the value is cached per element instead of read every sync
		* (getComputedStyle forces a style flush). The cache is dropped on the
		* layout/transition kicks that can flip it (the sidebar's collapse swaps
		* `overflow` between the expanded and the rail state).
		*/
		let clipsCache = /* @__PURE__ */ new WeakMap();
		function invalidateClips(entries) {
			if (entries === void 0) {
				clipsCache = /* @__PURE__ */ new WeakMap();
				return;
			}
			for (const entry of entries) clipsCache.delete(entry.target);
		}
		function clipsOverflow(el) {
			const cached = clipsCache.get(el);
			if (cached !== void 0) return cached;
			const style = getComputedStyle(el);
			const value = style.overflowX !== "visible" || style.overflowY !== "visible";
			clipsCache.set(el, value);
			return value;
		}
		const TRANSLATE_PATTERN = /translate3d\(\s*(-?[\d.]+)px,\s*(-?[\d.]+)px/;
		const DIALOG_SELECTOR = "[role=\"dialog\"]";
		const CONTENTS = "contents";
		/** Elements we may write a mirrored lean offset onto. */
		function leanTargets(host, underlay, containers) {
			const out = [];
			const walk = (parent) => {
				for (const child of parent.children) {
					if (child === underlay || !(child instanceof HTMLElement)) continue;
					if (child.querySelector(DIALOG_SELECTOR) !== null) continue;
					if (getComputedStyle(child).display === CONTENTS) {
						containers.add(child);
						walk(child);
						continue;
					}
					out.push(child);
				}
			};
			walk(host);
			return out;
		}
		/** One glass pane: host underlay, kit surface portal, pointer feed, lean mirror. */
		function NicoGlassPane({ instance, params }) {
			const { host, clips, key } = instance;
			const strength = clips ? 0 : params.strength;
			const [underlay, setUnderlay] = (0, react.useState)(null);
			(0, react.useEffect)(() => {
				const el = document.createElement("div");
				el.setAttribute(SURFACE_ATTRIBUTE, "");
				el.setAttribute("aria-hidden", "true");
				host.insertBefore(el, host.firstChild);
				host.setAttribute(PANE_ATTRIBUTE, key);
				host.style.setProperty("--dsh-nico-pane-radius", `${PANE_RADIUS}px`);
				const wasPositioned = getComputedStyle(host).position !== "static";
				if (!wasPositioned) host.style.position = "relative";
				const keeper = new MutationObserver(() => {
					if (el.parentElement !== host || host.firstElementChild !== el) host.insertBefore(el, host.firstChild);
				});
				keeper.observe(host, { childList: true });
				setUnderlay(el);
				return () => {
					keeper.disconnect();
					setUnderlay(null);
					el.remove();
					if (!wasPositioned && host.style.position === "relative") host.style.removeProperty("position");
					host.removeAttribute(PANE_ATTRIBUTE);
					host.style.removeProperty("--dsh-nico-pane-radius");
				};
			}, [host, key]);
			(0, react.useEffect)(() => {
				if (underlay === null || strength <= 0) return;
				const forward = (event) => {
					const surface = underlay.firstElementChild;
					if (surface === null) return;
					const rect = host.getBoundingClientRect();
					const onBox = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
					const dialog = event.target instanceof Element ? event.target.closest(DIALOG_SELECTOR) : null;
					const onPane = onBox && (dialog === null || dialog.contains(host));
					surface.dispatchEvent(new PointerEvent(onPane ? event.type : "pointerleave", {
						bubbles: false,
						cancelable: false,
						composed: false,
						pointerId: event.pointerId,
						pointerType: event.pointerType,
						isPrimary: event.isPrimary,
						clientX: event.clientX,
						clientY: event.clientY
					}));
				};
				host.addEventListener("pointermove", forward);
				host.addEventListener("pointerleave", forward);
				host.addEventListener("pointercancel", forward);
				return () => {
					host.removeEventListener("pointermove", forward);
					host.removeEventListener("pointerleave", forward);
					host.removeEventListener("pointercancel", forward);
				};
			}, [
				host,
				underlay,
				strength
			]);
			(0, react.useEffect)(() => {
				if (underlay === null || strength <= 0) return;
				let targets = null;
				const containers = /* @__PURE__ */ new Set();
				let lastX = 0;
				let lastY = 0;
				const collect = () => {
					const next = leanTargets(host, underlay, containers);
					targets = next;
					return next;
				};
				const applyToShell = (x, y) => {
					const shell = underlay.firstElementChild;
					if (!(shell instanceof HTMLElement)) return;
					if (x === 0 && y === 0) shell.style.removeProperty("translate");
					else shell.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px`;
				};
				const write = (x, y) => {
					applyToShell(x, y);
					const list = targets ?? collect();
					for (const el of list) if (x === 0 && y === 0) {
						el.style.removeProperty("translate");
						el.removeAttribute(LEAN_ATTRIBUTE);
					} else {
						el.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px`;
						el.setAttribute(LEAN_ATTRIBUTE, "");
					}
				};
				const observers = /* @__PURE__ */ new Set();
				const structure = new MutationObserver(() => {
					targets = null;
				});
				structure.observe(host, { childList: true });
				const motion = new MutationObserver((records) => {
					for (const record of records) {
						const el = record.target;
						if (!(el instanceof HTMLElement) || !el.classList.contains("ngs-motion")) continue;
						const match = TRANSLATE_PATTERN.exec(el.style.transform);
						const x = match === null ? 0 : Number(match[1]);
						const y = match === null ? 0 : Number(match[2]);
						const next = Math.abs(x) < .02 && Math.abs(y) < .02 ? [0, 0] : [x, y];
						if (next[0] === lastX && next[1] === lastY && targets !== null) continue;
						lastX = next[0];
						lastY = next[1];
						write(next[0], next[1]);
						for (const container of containers) {
							if (observers.has(container)) continue;
							observers.add(container);
							structure.observe(container, { childList: true });
						}
					}
				});
				motion.observe(underlay, {
					subtree: true,
					attributes: true,
					attributeFilter: ["style"]
				});
				return () => {
					structure.disconnect();
					motion.disconnect();
					applyToShell(0, 0);
					for (const el of targets ?? []) {
						el.style.removeProperty("translate");
						el.removeAttribute(LEAN_ATTRIBUTE);
					}
				};
			}, [
				host,
				underlay,
				strength
			]);
			if (underlay === null) return null;
			return (0, react_dom.createPortal)(/* @__PURE__ */ (0, react_jsx_runtime.jsx)(A, {
				cornerRadius: PANE_RADIUS,
				optics: params.optics,
				elasticity: strength,
				highlightIntensity: params.highlight
			}), underlay);
		}
		/** Push the current params into the live pane layer (no-op while unmounted). */
		let pushParams = null;
		/**
		* Hand fresh knobs to the pane layer.
		* @param params - pane parameters derived from the layer settings.
		*/
		function syncGlassPanes(params) {
			pushParams?.(params);
		}
		/**
		* Mount the pane layer: a hidden provider root plus a keeper that keeps the
		* pane set in sync with the app's DOM.
		* @param getParams - reads the current pane parameters.
		* @returns a disposer that removes every underlay and host hook.
		*/
		function startGlassPanes(getParams) {
			const hostEl = document.createElement("div");
			hostEl.setAttribute(HOST_ATTRIBUTE, "");
			hostEl.setAttribute("aria-hidden", "true");
			hostEl.style.position = "fixed";
			hostEl.style.top = "0";
			hostEl.style.left = "0";
			hostEl.style.width = "0";
			hostEl.style.height = "0";
			hostEl.style.overflow = "hidden";
			hostEl.style.pointerEvents = "none";
			document.body.appendChild(hostEl);
			const reactRoot = (0, react_dom_client.createRoot)(hostEl);
			let disposed = false;
			let params = getParams();
			let paramsKey = "";
			let signature = "";
			let instances = [];
			let frame = 0;
			let settle = 0;
			const observed = /* @__PURE__ */ new Set();
			const resizeObserver = typeof ResizeObserver === "function" ? new ResizeObserver((entries) => {
				invalidateClips(entries);
				schedule();
			}) : null;
			const keyOf = (value) => {
				const o = value.optics;
				return `${value.mica ? 1 : 0}/${value.overLight ? 1 : 0}/${value.strength}/${value.highlight}/${o.blur}/${o.brightness}/${o.refraction}/${o.depth}/${o.curvature}/${o.dispersion}`;
			};
			const render = () => {
				reactRoot.render(/* @__PURE__ */ (0, react_jsx_runtime.jsx)(dr, {
					quality: "high",
					overLight: params.overLight,
					lensMapRasterScale: LENS_MAP_RASTER_SCALE,
					children: instances.map((instance) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(NicoGlassPane, {
						instance,
						params
					}, instance.key))
				}));
			};
			const resolve = () => {
				const out = [];
				const seen = /* @__PURE__ */ new Set();
				for (const def of PANE_DEFS) {
					const host = def.select();
					if (host === null || seen.has(host)) continue;
					seen.add(host);
					out.push({
						key: def.key,
						host,
						id: identityOf(host),
						clips: clipsOverflow(host)
					});
				}
				return out;
			};
			const sync = () => {
				if (disposed) return;
				const nextParams = getParams();
				if (nextParams !== params) {
					params = nextParams;
					paramsKey = keyOf(nextParams);
				}
				const next = params.mica ? resolve() : [];
				const nextSignature = next.map((i) => `${i.key}:${i.id}:${i.clips ? 1 : 0}`).join("|") + `#${paramsKey}`;
				if (nextSignature === signature) return;
				signature = nextSignature;
				instances = next;
				render();
			};
			const watch = () => {
				if (resizeObserver === null) return;
				const sidebar = first("[class*=\"sidebarCol\"]");
				const targets = [
					sidebar,
					sidebar?.parentElement ?? null,
					first("[data-dsh-frame]"),
					first("[data-phase=\"active\"]"),
					first("[data-composer-seat]"),
					document.getElementById("root"),
					...instances.map((instance) => instance.host)
				];
				for (const el of targets) {
					if (el === null || observed.has(el)) continue;
					observed.add(el);
					resizeObserver.observe(el);
				}
			};
			function tick() {
				if (disposed) return;
				sync();
				watch();
				settle -= 1;
				frame = settle > 0 ? window.requestAnimationFrame(tick) : 0;
			}
			function schedule() {
				if (disposed) return;
				settle = SETTLE_FRAMES;
				if (frame !== 0) return;
				frame = window.requestAnimationFrame(tick);
			}
			const rootNode = document.getElementById("root");
			const mutations = new MutationObserver(() => {
				schedule();
			});
			if (rootNode !== null) mutations.observe(rootNode, {
				childList: true,
				subtree: true
			});
			const onResize = () => {
				invalidateClips();
				schedule();
			};
			const onTransitionEnd = () => {
				invalidateClips();
				schedule();
			};
			window.addEventListener("resize", onResize);
			document.addEventListener("transitionend", onTransitionEnd, true);
			pushParams = (next) => {
				if (disposed) return;
				params = next;
				paramsKey = keyOf(next);
				schedule();
			};
			schedule();
			return () => {
				disposed = true;
				pushParams = null;
				if (frame !== 0) window.cancelAnimationFrame(frame);
				mutations.disconnect();
				resizeObserver?.disconnect();
				window.removeEventListener("resize", onResize);
				document.removeEventListener("transitionend", onTransitionEnd, true);
				reactRoot.unmount();
				hostEl.remove();
				sweepPaneResidue();
			};
		}
		/** Remove every pane hook the layer may have left on app-owned nodes. */
		function sweepPaneResidue() {
			for (const el of document.querySelectorAll(`[${PANE_ATTRIBUTE}]`)) {
				el.removeAttribute(PANE_ATTRIBUTE);
				if (el instanceof HTMLElement) el.style.removeProperty("--dsh-nico-pane-radius");
			}
			for (const el of document.querySelectorAll(`[${SURFACE_ATTRIBUTE}]`)) el.remove();
			for (const el of document.querySelectorAll(`[${LEAN_ATTRIBUTE}]`)) {
				el.removeAttribute(LEAN_ATTRIBUTE);
				if (el instanceof HTMLElement) el.style.removeProperty("translate");
			}
		}
		//#endregion
		//#region src/client/reading-pad.ts
		/**
		* Conversation reading pads: frost plates on user bubbles and assistant
		* prose only. Think/tool cards stay clear until expanded. Hero has none.
		* Ported from more-nico/dshLiquidTheme markReadingPads (no adaptive ink).
		*/
		const PAD_ATTR = "data-dsh-nico-pad";
		function isDisclosureOpen(root) {
			return root.getAttribute("aria-expanded") === "true" || root.querySelector("[aria-expanded=\"true\"]") !== null;
		}
		function firstExpandedSurface(root) {
			if (root === null) return null;
			return root.querySelector("[class*=\"thinkBody\"]") ?? root.querySelector("[data-terminal]") ?? root.querySelector("[class*=\"ioCard\"]") ?? root.querySelector("[class*=\"terminalBody\"]") ?? root.querySelector("[class*=\"diffBody\"]") ?? root.querySelector("[class*=\"readBody\"]") ?? root.querySelector("[class*=\"searchBody\"]") ?? root.querySelector("[class*=\"webBody\"]") ?? root.querySelector("[class*=\"codeBody\"]") ?? root.querySelector("pre");
		}
		function findExpandedPad(card) {
			const host = card.hasAttribute("data-sample") && card.parentElement !== null ? card.parentElement : card;
			const hit = firstExpandedSurface(host) ?? firstExpandedSurface(card.nextElementSibling);
			if (hit !== null) return hit;
			return [...host.children].find((el) => el.getAttribute("aria-expanded") !== "true" && el.querySelector("[aria-expanded]") === null);
		}
		function isHero() {
			return document.querySelector("[data-slot=\"conversation.hero.workspace\"]") !== null || document.querySelector("[data-phase=\"hero\"]") !== null;
		}
		const TABLE_WRAP_ATTR = "data-dsh-nico-table-wrap";
		function unwrapTables(root = document) {
			for (const wrap of root.querySelectorAll(`[${TABLE_WRAP_ATTR}]`)) {
				const table = wrap.querySelector("table");
				if (table !== null) wrap.replaceWith(table);
				else wrap.remove();
			}
		}
		function wrapWideTables(root = document) {
			for (const table of root.querySelectorAll("table")) {
				if (table.closest(`[${TABLE_WRAP_ATTR}], [class*="tableScroll"]`) !== null) continue;
				if (table.closest(`[data-conversation-scroll], [data-chat-flow-kind], [data-dsh-nico-pad]`) === null) continue;
				const wrap = document.createElement("div");
				wrap.setAttribute(TABLE_WRAP_ATTR, "");
				table.replaceWith(wrap);
				wrap.appendChild(table);
			}
		}
		function markReadingPads() {
			for (const node of document.querySelectorAll(`[${PAD_ATTR}]`)) node.removeAttribute(PAD_ATTR);
			if (isHero()) {
				document.documentElement.setAttribute("data-dsh-nico-home", "");
				return;
			}
			document.documentElement.removeAttribute("data-dsh-nico-home");
			for (const row of document.querySelectorAll("[data-chat-flow-kind=\"user\"], [data-chat-flow-kind=\"steering\"]")) {
				const bubble = row.querySelector("[class*=\"bubble\"]");
				if (bubble !== null) bubble.setAttribute(PAD_ATTR, "user");
			}
			for (const step of document.querySelectorAll("[data-chat-flow-kind=\"assistant-step\"]")) {
				let host = step;
				while (host.children.length === 1) {
					const only = host.firstElementChild;
					if (only === null || only.hasAttribute("data-variant")) break;
					if (host.querySelector(":scope > [data-variant]") !== null) break;
					host = only;
				}
				const kids = [...host.children];
				if (kids.some((child) => child.hasAttribute("data-variant"))) {
					for (const child of kids) if (!child.hasAttribute("data-variant")) child.setAttribute(PAD_ATTR, "assistant");
				} else if (host !== step) host.setAttribute(PAD_ATTR, "assistant");
			}
			for (const card of document.querySelectorAll("[data-variant]")) {
				if (!isDisclosureOpen(card)) continue;
				const expanded = findExpandedPad(card);
				if (expanded !== void 0 && expanded !== card) expanded.setAttribute(PAD_ATTR, "expand");
			}
			wrapWideTables();
		}
		function clearReadingPads() {
			for (const node of document.querySelectorAll(`[${PAD_ATTR}]`)) node.removeAttribute(PAD_ATTR);
			unwrapTables();
			document.documentElement.removeAttribute("data-dsh-nico-home");
			document.documentElement.removeAttribute("data-dsh-nico-scrim");
		}
		function startReadingPads(active) {
			let timer = 0;
			const pulse = () => {
				if (timer !== 0) window.clearTimeout(timer);
				timer = window.setTimeout(() => {
					timer = 0;
					if (!active()) {
						clearReadingPads();
						return;
					}
					document.documentElement.setAttribute("data-dsh-nico-scrim", "");
					markReadingPads();
				}, 48);
			};
			const root = document.getElementById("root");
			const observer = new MutationObserver(pulse);
			if (root !== null) observer.observe(root, {
				childList: true,
				subtree: true,
				attributes: true,
				attributeFilter: ["aria-expanded", "data-phase"]
			});
			pulse();
			return () => {
				if (timer !== 0) window.clearTimeout(timer);
				observer.disconnect();
				clearReadingPads();
			};
		}
		//#endregion
		//#region src/client/theme-layer.ts
		/** html attribute selecting the Aqua layer: CSS hooks and ambient effects. */
		const AQUA_ATTRIBUTE = "data-dsh-aqua";
		/** localStorage key carrying the layer enable flag. */
		const AQUA_ENABLED_KEY = "dsh.ui-aqua.enabled";
		/** The layer's identity in the theme override stack (inspection-visible). */
		const OVERRIDE_SOURCE = "dsh-nico-theme";
		const FONT_STACK = "'Space Grotesk Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif";
		/** Scheme-invariant override value (applied to both palettes). */
		const both = (value) => ({
			light: value,
			dark: value
		});
		/**
		* Alias-token override layer: the deep-sea palette. Every value is a
		* `{ light, dark }` pair so the layer stays legible when the user switches
		* the Appearance preference — dark is deep-sea navy, light is cool white-blue.
		*/
		const AQUA_TOKEN_OVERRIDES = {
			"--dsw-font-family": both(FONT_STACK),
			"--dsw-alias-bg-base": {
				light: "#F4F8FD",
				dark: "#0C121B"
			},
			"--dsw-alias-bg-layer-1": {
				light: "#FFFFFF",
				dark: "#111A27"
			},
			"--dsw-alias-bg-layer-2": {
				light: "#ECF2FA",
				dark: "#162130"
			},
			"--dsw-alias-bg-layer-3": {
				light: "#E2EBF7",
				dark: "#1C2A3D"
			},
			"--dsw-alias-bg-overlay": {
				light: "#DCE7F4",
				dark: "#22334A"
			},
			"--dsw-alias-bg-module-platform": {
				light: "#FFFFFF",
				dark: "#111A27"
			},
			"--dsw-alias-bg-multi-select": {
				light: "#FFFFFF",
				dark: "#162130"
			},
			"--dsw-alias-bg-skeleton": {
				light: "rgba(19, 45, 83, 0.08)",
				dark: "rgba(148, 180, 220, 0.12)"
			},
			"--dsw-alias-bg-mask-1": {
				light: "rgba(19, 37, 62, 0.3)",
				dark: "rgba(4, 8, 14, 0.55)"
			},
			"--dsw-alias-bg-mask-2": {
				light: "rgba(19, 37, 62, 0.12)",
				dark: "rgba(4, 8, 14, 0.25)"
			},
			"--dsw-alias-bg-mask-3": {
				light: "rgba(19, 37, 62, 0.3)",
				dark: "rgba(4, 8, 14, 0.5)"
			},
			"--dsw-alias-bg-mask-drop": {
				light: "rgba(244, 248, 253, 0.72)",
				dark: "rgba(12, 18, 27, 0.7)"
			},
			"--dsw-alias-border-l1": {
				light: "rgba(19, 45, 83, 0.08)",
				dark: "rgba(148, 180, 220, 0.08)"
			},
			"--dsw-alias-border-l2": {
				light: "rgba(19, 45, 83, 0.14)",
				dark: "rgba(148, 180, 220, 0.15)"
			},
			"--dsw-alias-border-l2-darkmode-thin": {
				light: "rgba(19, 45, 83, 0.1)",
				dark: "rgba(148, 180, 220, 0.1)"
			},
			"--dsw-alias-border-l3": {
				light: "rgba(19, 45, 83, 0.22)",
				dark: "rgba(148, 180, 220, 0.24)"
			},
			"--dsw-alias-border-l4": {
				light: "rgba(19, 45, 83, 0.32)",
				dark: "rgba(148, 180, 220, 0.34)"
			},
			"--dsw-alias-border-inverted": {
				light: "rgba(19, 45, 83, 0.06)",
				dark: "rgba(148, 180, 220, 0.12)"
			},
			"--dsw-alias-border-inverted2": {
				light: "rgba(19, 45, 83, 0.08)",
				dark: "rgba(148, 180, 220, 0.08)"
			},
			"--dsw-alias-label-primary": {
				light: "#13243E",
				dark: "#EAF2FC"
			},
			"--dsw-alias-label-secondary": {
				light: "#40597A",
				dark: "#AFC3DC"
			},
			"--dsw-alias-label-tertiary": {
				light: "#5D7696",
				dark: "#8399B5"
			},
			"--dsw-alias-label-caption": {
				light: "#7E93AC",
				dark: "#6B829F"
			},
			"--dsw-alias-label-dimmed": {
				light: "#C9D4E2",
				dark: "#4E5F76"
			},
			"--dsw-alias-label-primary-bluish": {
				light: "#2E5EB8",
				dark: "#BFD6F6"
			},
			"--dsw-alias-label-primary-dimmed": {
				light: "#1E3556",
				dark: "#D7E3F4"
			},
			"--dsw-alias-label-primary-inverted": {
				light: "#FFFFFF",
				dark: "#162130"
			},
			"--dsw-alias-label-primary-foreground": {
				light: "#FFFFFF",
				dark: "#FFFFFF"
			},
			"--dsw-alias-brand-primary": {
				light: "#13243E",
				dark: "#EAF2FC"
			},
			"--dsw-alias-brand-text": {
				light: "#13243E",
				dark: "#EAF2FC"
			},
			"--dsw-alias-brand-primary-invert": {
				light: "#FFFFFF",
				dark: "#0C121B"
			},
			"--dsw-alias-brand-primary-new-colorprimary-new-color": {
				light: "#3F76D8",
				dark: "#6E9BE8"
			},
			"--dsw-alias-state-business-primary": {
				light: "#3F76D8",
				dark: "#6E9BE8"
			},
			"--dsw-alias-state-business-tertiary": {
				light: "#DCE9FB",
				dark: "#1D2C44"
			},
			"--dsw-alias-state-success-tertiary": {
				light: "#DDF3E4",
				dark: "#12271C"
			},
			"--dsw-alias-state-warn-tertiary": {
				light: "#FCEED6",
				dark: "#2A2416"
			},
			"--dsw-alias-button-primary-fill": {
				light: "#3F76D8",
				dark: "#4A7FD9"
			},
			"--dsw-alias-button-primary-hover": {
				light: "#5C8DE0",
				dark: "#5E8FE6"
			},
			"--dsw-alias-button-primary-dimmed": {
				light: "#DCE9FB",
				dark: "#162130"
			},
			"--dsw-alias-button-info-fill": {
				light: "#3F76D8",
				dark: "#6E9BE8"
			},
			"--dsw-alias-button-info-hover": {
				light: "#5C8DE0",
				dark: "#7FA8EF"
			},
			"--dsw-alias-button-elevated-fill": {
				light: "#FFFFFF",
				dark: "#162130"
			},
			"--dsw-alias-button-floating-fill": {
				light: "#FFFFFF",
				dark: "#162130"
			},
			"--dsw-alias-button-floating-hover": {
				light: "#F0F5FB",
				dark: "#1C2A3D"
			},
			"--dsw-alias-button-contrast-fill": {
				light: "#26364D",
				dark: "#EAF2FC"
			},
			"--dsw-alias-button-ghost-active-fill": {
				light: "#DCE7F4",
				dark: "#1C2A3D"
			},
			"--dsw-alias-button-ghost-active-hover": {
				light: "#E9F0F8",
				dark: "#162130"
			},
			"--dsw-alias-button-ghost-active-border": {
				light: "#8FA3BC",
				dark: "#6B829F"
			},
			"--dsw-alias-interactive-bg-hover": {
				light: "rgba(63, 118, 216, 0.08)",
				dark: "rgba(126, 164, 223, 0.1)"
			},
			"--dsw-alias-interactive-bg-hover-accent": {
				light: "rgba(63, 118, 216, 0.14)",
				dark: "rgba(126, 164, 223, 0.2)"
			},
			"--dsw-alias-interactive-bg-active": {
				light: "rgba(63, 118, 216, 0.2)",
				dark: "rgba(126, 164, 223, 0.26)"
			},
			"--dsw-alias-interactive-bg-hover-danger": {
				light: "rgba(236, 19, 19, 0.05)",
				dark: "rgba(242, 90, 90, 0.14)"
			},
			"--dsw-alias-interactive-bg-hover-solid": {
				light: "#F0F5FB",
				dark: "#1C2A3D"
			},
			"--dsw-alias-markdown-code-block": {
				light: "#F0F5FB",
				dark: "#0D141F"
			},
			"--dsw-alias-markdown-code-block-banner": {
				light: "#F5F8FD",
				dark: "#121B29"
			},
			"--dsw-alias-markdown-inline-code": {
				light: "#E4EDF8",
				dark: "#172334"
			},
			"--dsw-alias-markdown-citation": {
				light: "#EAF1F9",
				dark: "#1A2534"
			},
			"--dsw-alias-markdown-tag": {
				light: "#E4EDF8",
				dark: "#162130"
			},
			"--dsw-alias-markdown-placeholder": {
				light: "#EAF1F9",
				dark: "#131D2B"
			},
			"--dsw-alias-markdown-code-segment-selected": {
				light: "#FFFFFF",
				dark: "#1C2A3D"
			},
			"--dsw-alias-markdown-code-segment-unselected": {
				light: "#F0F5FB",
				dark: "#0F1723"
			},
			"--dsw-alias-scrollbar-bg-l1": {
				light: "rgba(63, 118, 216, 0.28)",
				dark: "rgba(126, 164, 223, 0.28)"
			},
			"--dsw-alias-scrollbar-bg-l2": {
				light: "rgba(63, 118, 216, 0.4)",
				dark: "rgba(126, 164, 223, 0.36)"
			},
			"--dsw-alias-scrollbar-hover-l1": {
				light: "rgba(63, 118, 216, 0.5)",
				dark: "rgba(126, 164, 223, 0.44)"
			},
			"--dsw-alias-scrollbar-hover-l2": {
				light: "rgba(63, 118, 216, 0.6)",
				dark: "rgba(126, 164, 223, 0.52)"
			},
			"--dsw-specific-sidebar-fill": {
				light: "transparent",
				dark: "transparent"
			},
			"--dsw-specific-sidebar-nav-item-active": {
				light: "#DEE9F8",
				dark: "#1B283A"
			},
			"--dsw-specific-sidebar-nav-item-hover": {
				light: "#E9F0F8",
				dark: "#15202F"
			},
			"--dsw-specific-sidebar-nav-item-active-accent": {
				light: "#3F76D8",
				dark: "#6E9BE8"
			},
			"--dsw-specific-input-major": {
				light: "#FFFFFF",
				dark: "#101927"
			},
			"--dsw-specific-login-input": {
				light: "#F0F5FB",
				dark: "#0D141F"
			},
			"--dsw-specific-menu": {
				light: "#EAF1F9",
				dark: "#162130"
			},
			"--dsw-specific-selector": {
				light: "#EAF1F9",
				dark: "#1C2A3D"
			},
			"--dsw-specific-bubble": {
				light: "#F0F5FC",
				dark: "#121C2A"
			},
			"--dsw-specific-bubble-highlight": {
				light: "#DCE9FB",
				dark: "#1A283A"
			},
			"--dsw-specific-tip": {
				light: "#EAF1F9",
				dark: "#131D2B"
			},
			"--dsw-alias-toast-bg": {
				light: "#1B3256",
				dark: "#1C2A3D"
			},
			"--dsw-alias-tooltip-bg": {
				light: "#13243E",
				dark: "#162130"
			},
			"--dsw-shadow-lv1": {
				light: "0 2px 4px rgba(19, 45, 83, 0.06)",
				dark: "0 2px 4px rgba(2, 6, 14, 0.5)"
			},
			"--dsw-shadow-lv1-blur": {
				light: "0 4px 12px rgba(19, 45, 83, 0.05)",
				dark: "0 4px 12px rgba(2, 6, 14, 0.4)"
			},
			"--dsw-shadow-lv2": {
				light: "0 4px 12px rgba(19, 45, 83, 0.05), 0 2px 8px rgba(19, 45, 83, 0.06)",
				dark: "0 4px 12px rgba(2, 6, 14, 0.4), 0 2px 8px rgba(2, 6, 14, 0.35)"
			},
			"--dsw-shadow-lv3": {
				light: "0 0 1px rgba(19, 45, 83, 0.08), 0 12px 32px rgba(19, 45, 83, 0.12)",
				dark: "0 0 1px rgba(2, 6, 14, 0.6), 0 12px 32px rgba(2, 6, 14, 0.55)"
			}
		};
		/**
		* Compatibility-mode token set: the same palette as the floating mode, but
		* every surface token turns translucent, so the fluid/wallpaper backdrop
		* shows through the STOCK layout. This is what makes the material generic —
		* any plugin that consumes the shared design tokens gets the glass for free.
		*/
		const COMPAT_SURFACE_OVERRIDES = {
			"--dsw-alias-bg-layer-1": {
				light: "rgba(255, 255, 255, 0.55)",
				dark: "rgba(17, 26, 39, 0.55)"
			},
			"--dsw-alias-bg-layer-2": {
				light: "rgba(236, 242, 250, 0.5)",
				dark: "rgba(22, 33, 48, 0.55)"
			},
			"--dsw-alias-bg-layer-3": {
				light: "rgba(226, 235, 247, 0.45)",
				dark: "rgba(28, 42, 61, 0.5)"
			},
			"--dsw-alias-bg-overlay": {
				light: "rgba(220, 231, 244, 0.6)",
				dark: "rgba(34, 51, 74, 0.6)"
			},
			"--dsw-alias-bg-module-platform": {
				light: "rgba(255, 255, 255, 0.55)",
				dark: "rgba(17, 26, 39, 0.55)"
			},
			"--dsw-alias-bg-multi-select": {
				light: "rgba(255, 255, 255, 0.55)",
				dark: "rgba(22, 33, 48, 0.55)"
			},
			"--dsw-specific-menu": {
				light: "rgba(234, 241, 249, 0.6)",
				dark: "rgba(22, 33, 48, 0.6)"
			},
			"--dsw-specific-selector": {
				light: "rgba(234, 241, 249, 0.55)",
				dark: "rgba(28, 42, 61, 0.55)"
			},
			"--dsw-specific-bubble": {
				light: "rgba(240, 245, 252, 0.55)",
				dark: "rgba(18, 28, 42, 0.55)"
			},
			"--dsw-specific-bubble-highlight": {
				light: "rgba(220, 233, 251, 0.55)",
				dark: "rgba(26, 40, 58, 0.55)"
			},
			"--dsw-specific-tip": {
				light: "rgba(234, 241, 249, 0.6)",
				dark: "rgba(19, 29, 43, 0.6)"
			},
			"--dsw-specific-input-major": {
				light: "rgba(255, 255, 255, 0.5)",
				dark: "rgba(16, 25, 39, 0.5)"
			},
			"--dsw-specific-login-input": {
				light: "rgba(240, 245, 251, 0.5)",
				dark: "rgba(13, 20, 31, 0.5)"
			},
			"--dsw-alias-markdown-code-block": {
				light: "rgba(240, 245, 251, 0.5)",
				dark: "rgba(13, 20, 31, 0.5)"
			},
			"--dsw-alias-markdown-code-block-banner": {
				light: "rgba(245, 248, 253, 0.55)",
				dark: "rgba(18, 27, 41, 0.55)"
			},
			"--dsw-alias-markdown-inline-code": {
				light: "rgba(228, 237, 248, 0.5)",
				dark: "rgba(23, 35, 52, 0.5)"
			},
			"--dsw-alias-markdown-citation": {
				light: "rgba(234, 241, 249, 0.55)",
				dark: "rgba(26, 37, 52, 0.55)"
			},
			"--dsw-alias-markdown-tag": {
				light: "rgba(228, 237, 248, 0.5)",
				dark: "rgba(22, 33, 48, 0.5)"
			},
			"--dsw-alias-markdown-placeholder": {
				light: "rgba(234, 241, 249, 0.55)",
				dark: "rgba(19, 29, 43, 0.55)"
			},
			"--dsw-alias-toast-bg": {
				light: "rgba(27, 50, 86, 0.85)",
				dark: "rgba(28, 42, 61, 0.85)"
			},
			"--dsw-alias-tooltip-bg": {
				light: "rgba(19, 36, 62, 0.88)",
				dark: "rgba(22, 33, 48, 0.88)"
			}
		};
		/** Compatibility token layer: the palette plus the translucent surfaces. */
		const COMPAT_TOKEN_OVERRIDES = {
			...AQUA_TOKEN_OVERRIDES,
			...COMPAT_SURFACE_OVERRIDES
		};
		/** Read the persisted enable flag (absent storage means on). */
		function readEnabled() {
			try {
				const raw = localStorage.getItem(AQUA_ENABLED_KEY);
				return raw === null ? true : raw === "true";
			} catch {
				return true;
			}
		}
		/** Persist the enable flag (storage failures keep the in-memory state). */
		function writeEnabled(value) {
			try {
				localStorage.setItem(AQUA_ENABLED_KEY, String(value));
			} catch {}
		}
		/** Shipped defaults — nico-glass-kit playground values plus the tuned backdrop. */
		const SETTINGS_DEFAULTS = {
			mode: "mica",
			blur: 3,
			brightness: 1.1,
			refraction: 100,
			depth: 8,
			curvature: .2,
			dispersion: 10,
			highlight: 1,
			elasticity: true,
			elasticityStrength: .2,
			fluidHue: 320,
			fluidDepth: 25,
			bgBrightness: 50,
			background: "fluid",
			wallpaper: "",
			wallpaperBlur: 0,
			wallpaperFrost: 0,
			videoBlur: 6,
			videoBrightness: 45,
			scrim: 25,
			scrimBlur: 5
		};
		/** Numeric knob keys and their localStorage names. */
		const NUMERIC_KEYS = {
			blur: "dsh.ui-nico.blur",
			brightness: "dsh.ui-nico.brightness",
			refraction: "dsh.ui-nico.refraction",
			depth: "dsh.ui-nico.depth",
			curvature: "dsh.ui-nico.curvature",
			dispersion: "dsh.ui-nico.dispersion",
			highlight: "dsh.ui-nico.highlight",
			elasticityStrength: "dsh.ui-nico.elasticityStrength",
			fluidHue: "dsh.ui-aqua.fluidHue",
			fluidDepth: "dsh.ui-aqua.fluidDepth",
			bgBrightness: "dsh.ui-aqua.bgBrightness",
			wallpaperBlur: "dsh.ui-aqua.wallpaperBlur",
			wallpaperFrost: "dsh.ui-aqua.wallpaperFrost",
			videoBlur: "dsh.ui-aqua.videoBlur",
			videoBrightness: "dsh.ui-aqua.videoBrightness",
			scrim: "dsh.ui-aqua.scrim",
			scrimBlur: "dsh.ui-aqua.scrimBlur"
		};
		/** Inclusive range for every numeric knob. */
		const NUMERIC_RANGE = {
			blur: [0, 64],
			brightness: [0, 2],
			refraction: [0, 100],
			depth: [0, 40],
			curvature: [0, 1],
			dispersion: [0, 100],
			highlight: [0, 2],
			elasticityStrength: [0, .5],
			fluidHue: [0, 360],
			fluidDepth: [0, 100],
			bgBrightness: [0, 100],
			wallpaperBlur: [0, 40],
			wallpaperFrost: [0, 100],
			videoBlur: [0, 40],
			videoBrightness: [0, 100],
			scrim: [0, 100],
			scrimBlur: [0, 40]
		};
		const MODE_KEY = "dsh.ui-aqua.mode";
		const BACKGROUND_KEY = "dsh.ui-aqua.background";
		const WALLPAPER_KEY = "dsh.ui-aqua.wallpaper";
		const ELASTICITY_KEY = "dsh.ui-nico.elasticity";
		/** Retired keys from earlier iterations — dropped once on load. */
		const RETIRED_KEYS = [
			"dsh.ui-aqua.blur",
			"dsh.ui-aqua.frost",
			"dsh.ui-aqua.specular",
			"dsh.ui-aqua.refract",
			"dsh.ui-aqua.refractOn",
			"dsh.ui-aqua.dispersion",
			"dsh.ui-aqua.spotlight",
			"dsh.ui-aqua.press",
			"dsh.ui-aqua.rim",
			"dsh.ui-aqua.whale",
			"dsh.ui-aqua.critters",
			"dsh.ui-aqua.mesh",
			"dsh.ui-aqua.entrance",
			"dsh.ui-aqua.tilt",
			"dsh.ui-aqua.lens",
			"dsh.ui-aqua.fluidTone"
		];
		/** Clamp a numeric knob into its sane range. */
		function clampSetting(key, value) {
			const [min, max] = NUMERIC_RANGE[key];
			return Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : SETTINGS_DEFAULTS[key];
		}
		/** Read one numeric knob from localStorage (absent/parse failure means the default). */
		function readSetting(key) {
			try {
				const raw = localStorage.getItem(NUMERIC_KEYS[key]);
				return raw === null ? SETTINGS_DEFAULTS[key] : clampSetting(key, Number(raw));
			} catch {
				return SETTINGS_DEFAULTS[key];
			}
		}
		/** Persist one numeric knob (storage failures keep the in-memory state). */
		function writeSetting(key, value) {
			try {
				localStorage.setItem(NUMERIC_KEYS[key], String(value));
			} catch {}
		}
		/** Read the backdrop source ('fluid' or 'wallpaper'). */
		function readBackground() {
			try {
				return localStorage.getItem(BACKGROUND_KEY) === "wallpaper" ? "wallpaper" : "fluid";
			} catch {
				return "fluid";
			}
		}
		/** Persist the backdrop source. */
		function writeBackground(value) {
			try {
				localStorage.setItem(BACKGROUND_KEY, value);
			} catch {}
		}
		/** Read the rendering mode ('mica' or 'compat'). */
		function readMode() {
			try {
				if (localStorage.getItem(MODE_KEY) === "compat") return "compat";
				return "mica";
			} catch {
				return "mica";
			}
		}
		/** Persist the rendering mode. */
		function writeMode(value) {
			try {
				localStorage.setItem(MODE_KEY, value);
			} catch {}
		}
		/** Read the wallpaper data URL (absent/oversized means empty). */
		function readWallpaper() {
			try {
				return localStorage.getItem(WALLPAPER_KEY) ?? "";
			} catch {
				return "";
			}
		}
		/** Persist the wallpaper data URL (quota failures keep it in memory only). */
		function writeWallpaper(value) {
			try {
				localStorage.setItem(WALLPAPER_KEY, value);
			} catch {}
		}
		function readFlag(key, fallback) {
			try {
				const raw = localStorage.getItem(key);
				return raw === null ? fallback : raw === "true";
			} catch {
				return fallback;
			}
		}
		function writeFlag(key, value) {
			try {
				localStorage.setItem(key, String(value));
			} catch {}
		}
		/** Whether the user asked the OS to reduce motion (kit has no opinion of its own). */
		function prefersReducedMotion() {
			try {
				return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			} catch {
				return false;
			}
		}
		/** Current scheme from the presenter-owned body attribute. */
		function activeScheme() {
			return document.body.hasAttribute("data-ds-dark-theme") ? "dark" : "light";
		}
		/**
		* Owns the Aqua layer lifecycle: reads the durable enable flag, and applies /
		* retracts every layer on change. Cross-tab flips arrive through the storage
		* event; every subscription and mounted effect are released when the plugin
		* fiber is disposed.
		*/
		var AquaLayer = class {
			enabled = false;
			settings = { ...SETTINGS_DEFAULTS };
			/** Resolved palette scheme: dark = the brightness knob darkens, light = it brightens. */
			dark = false;
			tokenDisposer;
			mainFluid;
			interactionDisposer;
			themeListener;
			seamDisposer;
			paneDisposer;
			padDisposer;
			/** Object URL of the current large-video wallpaper (revoked on replace). */
			videoObjectUrl;
			/** IndexedDB id backing the current object URL (guards against reloads). */
			videoBlobId;
			ctx;
			/**
			* @param ctx - owning client context.
			*/
			constructor(ctx) {
				this.ctx = ctx;
				ctx.effect(() => {
					const onStorage = (event) => {
						if (event.key === "dsh.ui-aqua.enabled") {
							this.enabled = readEnabled();
							this.sync();
						}
						const key = event.key;
						if (key !== null && (key in NUMERIC_KEYS || key === BACKGROUND_KEY || key === WALLPAPER_KEY || key === MODE_KEY || key === ELASTICITY_KEY)) {
							this.reloadSettings();
							if (this.enabled) {
								this.applySettings();
								this.applyTokens();
								this.applyFluidPalettes();
							}
						}
					};
					window.addEventListener("storage", onStorage);
					this.themeListener = this.ctx.on("theme/change", () => {
						this.dark = this.resolveScheme();
						if (this.enabled) {
							this.applySettings();
							this.applyFluidPalettes();
						}
					});
					return () => {
						window.removeEventListener("storage", onStorage);
						this.themeListener?.();
						this.themeListener = void 0;
						this.unmount();
					};
				}, "ui-aqua: layer lifecycle");
				this.enabled = readEnabled();
				this.reloadSettings();
				this.dark = this.resolveScheme();
				this.sync();
			}
			/** Current enable state (the settings row mirrors this). */
			getEnabled() {
				return this.enabled;
			}
			/** Current knob values (the settings row mirrors these). */
			getSettings() {
				return { ...this.settings };
			}
			/** Whether the resolved palette is dark (the brightness knob darkens). */
			getDark() {
				return this.dark;
			}
			/** Resolved scheme from the theme service (falls back to the body attribute). */
			resolveScheme() {
				try {
					return this.ctx.theme.getTheme().active.colorScheme === "dark";
				} catch {
					return activeScheme() === "dark";
				}
			}
			/** Re-read every knob from localStorage into memory. */
			reloadSettings() {
				try {
					for (const key of RETIRED_KEYS) localStorage.removeItem(key);
				} catch {}
				this.settings = {
					mode: readMode(),
					blur: readSetting("blur"),
					brightness: readSetting("brightness"),
					refraction: readSetting("refraction"),
					depth: readSetting("depth"),
					curvature: readSetting("curvature"),
					dispersion: readSetting("dispersion"),
					highlight: readSetting("highlight"),
					elasticity: readFlag(ELASTICITY_KEY, true),
					elasticityStrength: readSetting("elasticityStrength"),
					fluidHue: readSetting("fluidHue"),
					fluidDepth: readSetting("fluidDepth"),
					bgBrightness: readSetting("bgBrightness"),
					background: readBackground(),
					wallpaper: readWallpaper(),
					wallpaperBlur: readSetting("wallpaperBlur"),
					wallpaperFrost: readSetting("wallpaperFrost"),
					videoBlur: readSetting("videoBlur"),
					videoBrightness: readSetting("videoBrightness"),
					scrim: readSetting("scrim"),
					scrimBlur: readSetting("scrimBlur")
				};
			}
			/** Flip the layer: persist, then apply or retract every owned effect. */
			setEnabled(value) {
				if (value === this.enabled) return;
				this.enabled = value;
				writeEnabled(value);
				this.sync();
			}
			/** Set the rendering mode ('mica' or 'compat'). */
			setMode(value) {
				if (value === this.settings.mode) return;
				this.settings.mode = value;
				writeMode(value);
				if (this.enabled) {
					this.applySettings();
					this.applyTokens();
				}
			}
			/** Set the kit optics blur radius (px). */
			setBlur(value) {
				const next = clampSetting("blur", value);
				if (next === this.settings.blur) return;
				this.settings.blur = next;
				writeSetting("blur", next);
				if (this.enabled) this.applySettings();
			}
			/** Set the kit optics brightness multiplier. */
			setBrightness(value) {
				const next = clampSetting("brightness", value);
				if (next === this.settings.brightness) return;
				this.settings.brightness = next;
				writeSetting("brightness", next);
				if (this.enabled) this.applySettings();
			}
			/** Set the kit optics refraction strength (0-100). */
			setRefraction(value) {
				const next = clampSetting("refraction", value);
				if (next === this.settings.refraction) return;
				this.settings.refraction = next;
				writeSetting("refraction", next);
				if (this.enabled) this.applySettings();
			}
			/** Set the kit optics refraction band width (px). */
			setDepth(value) {
				const next = clampSetting("depth", value);
				if (next === this.settings.depth) return;
				this.settings.depth = next;
				writeSetting("depth", next);
				if (this.enabled) this.applySettings();
			}
			/** Set the kit optics bevel curvature (0-1). */
			setCurvature(value) {
				const next = clampSetting("curvature", value);
				if (next === this.settings.curvature) return;
				this.settings.curvature = next;
				writeSetting("curvature", next);
				if (this.enabled) this.applySettings();
			}
			/** Set the kit optics chromatic dispersion (0-100). */
			setDispersion(value) {
				const next = clampSetting("dispersion", value);
				if (next === this.settings.dispersion) return;
				this.settings.dispersion = next;
				writeSetting("dispersion", next);
				if (this.enabled) this.applySettings();
			}
			/** Set the rim-light highlight strength (0-2). */
			setHighlight(value) {
				const next = clampSetting("highlight", value);
				if (next === this.settings.highlight) return;
				this.settings.highlight = next;
				writeSetting("highlight", next);
				if (this.enabled) this.applySettings();
			}
			/** Set the mouse-elasticity master flag. */
			setElasticity(value) {
				if (value === this.settings.elasticity) return;
				this.settings.elasticity = value;
				writeFlag(ELASTICITY_KEY, value);
				if (this.enabled) this.applySettings();
			}
			/** Set the mouse-elasticity strength (0-0.5). */
			setElasticityStrength(value) {
				const next = clampSetting("elasticityStrength", value);
				if (next === this.settings.elasticityStrength) return;
				this.settings.elasticityStrength = next;
				writeSetting("elasticityStrength", next);
				if (this.enabled) this.applySettings();
			}
			/** Set the fluid hue (degrees, continuous). */
			setFluidHue(value) {
				const next = clampSetting("fluidHue", value);
				if (next === this.settings.fluidHue) return;
				this.settings.fluidHue = next;
				writeSetting("fluidHue", next);
				if (this.enabled) {
					this.applySettings();
					this.applyFluidPalettes();
				}
			}
			/** Set the fluid depth (0-100, continuous: deep ↔ pale). */
			setFluidDepth(value) {
				const next = clampSetting("fluidDepth", value);
				if (next === this.settings.fluidDepth) return;
				this.settings.fluidDepth = next;
				writeSetting("fluidDepth", next);
				if (this.enabled) this.applyFluidPalettes();
			}
			/** Set the background brightness (0-100: 0 = pure black, 50 = transparent, 100 = pure white). */
			setBgBrightness(value) {
				const next = clampSetting("bgBrightness", value);
				if (next === this.settings.bgBrightness) return;
				this.settings.bgBrightness = next;
				writeSetting("bgBrightness", next);
				if (this.enabled) this.applySettings();
			}
			/** Set the backdrop source (fluid board or custom wallpaper). */
			setBackground(value) {
				if (value === this.settings.background) return;
				this.settings.background = value;
				writeBackground(value);
				if (this.enabled) this.applySettings();
			}
			/** Set the wallpaper image (a data URL; empty clears it) or a large video
			*  (`idb:<id>` marker whose blob lives in IndexedDB). */
			setWallpaper(value) {
				const previous = this.settings.wallpaper;
				this.settings.wallpaper = value;
				writeWallpaper(value);
				if (previous.startsWith("idb:") && value !== previous) deleteVideoBlob(previous.slice(4));
				if (!value.startsWith("idb:") && this.videoObjectUrl !== void 0) {
					URL.revokeObjectURL(this.videoObjectUrl);
					this.videoObjectUrl = void 0;
					this.videoBlobId = void 0;
				}
				if (this.enabled) this.applySettings();
			}
			/** Set the wallpaper blur radius (px). */
			setWallpaperBlur(value) {
				const next = clampSetting("wallpaperBlur", value);
				if (next === this.settings.wallpaperBlur) return;
				this.settings.wallpaperBlur = next;
				writeSetting("wallpaperBlur", next);
				if (this.enabled) this.applySettings();
			}
			/** Set the wallpaper frost veil (0-100). */
			setWallpaperFrost(value) {
				const next = clampSetting("wallpaperFrost", value);
				if (next === this.settings.wallpaperFrost) return;
				this.settings.wallpaperFrost = next;
				writeSetting("wallpaperFrost", next);
				if (this.enabled) this.applySettings();
			}
			/** Set the video wallpaper blur radius (px). */
			setVideoBlur(value) {
				const next = clampSetting("videoBlur", value);
				if (next === this.settings.videoBlur) return;
				this.settings.videoBlur = next;
				writeSetting("videoBlur", next);
				if (this.enabled) this.applySettings();
			}
			/** Set the video wallpaper brightness (0-100, 100 = fully lit). */
			setVideoBrightness(value) {
				const next = clampSetting("videoBrightness", value);
				if (next === this.settings.videoBrightness) return;
				this.settings.videoBrightness = next;
				writeSetting("videoBrightness", next);
				if (this.enabled) this.applySettings();
			}
			/** Set the conversation pad opacity (0-100). */
			setScrim(value) {
				const next = clampSetting("scrim", value);
				if (next === this.settings.scrim) return;
				this.settings.scrim = next;
				writeSetting("scrim", next);
				if (this.enabled) this.applySettings();
			}
			/** Set the conversation pad blur (px). */
			setScrimBlur(value) {
				const next = clampSetting("scrimBlur", value);
				if (next === this.settings.scrimBlur) return;
				this.settings.scrimBlur = next;
				writeSetting("scrimBlur", next);
				if (this.enabled) this.applySettings();
			}
			/** After the user re-grants file access (选择视频 click on an fsa: video),
			*  drop the mount guard and re-apply so the file is re-read and played. */
			authorizeVideo() {
				if (this.videoObjectUrl !== void 0) {
					URL.revokeObjectURL(this.videoObjectUrl);
					this.videoObjectUrl = void 0;
				}
				this.videoBlobId = void 0;
				if (this.enabled) this.applySettings();
			}
			sync() {
				if (this.enabled) this.mount();
				else this.unmount();
			}
			/** The kit pane parameters for the current knobs (playground scale). */
			glassPaneParams() {
				const s = this.settings;
				return {
					mica: s.mode === "mica",
					overLight: !this.dark,
					optics: {
						blur: s.blur,
						brightness: s.brightness,
						refraction: s.refraction / 100,
						depth: s.depth,
						curvature: s.curvature,
						dispersion: s.dispersion / 100
					},
					highlight: s.highlight,
					strength: prefersReducedMotion() ? 0 : s.elasticity ? s.elasticityStrength : 0
				};
			}
			/** Write the knob-driven CSS variables and mode attributes onto <html>. */
			applySettings() {
				const style = document.documentElement.style;
				style.setProperty("--dsh-nico-blur", `${this.settings.blur}px`);
				style.setProperty("--dsh-nico-brightness", String(this.settings.brightness));
				style.setProperty("--dsh-aqua-wallpaper-blur", `${this.settings.wallpaperBlur}px`);
				style.setProperty("--dsh-aqua-wallpaper-frost", String(this.settings.wallpaperFrost / 100));
				style.setProperty("--dsh-aqua-video-blur", `${this.settings.videoBlur}px`);
				style.setProperty("--dsh-aqua-video-dim", String((100 - this.settings.videoBrightness) / 100 * .65));
				const dark = this.dark;
				style.setProperty("--dsh-aqua-brightness-black", String(dark ? Math.max(0, (50 - this.settings.bgBrightness) / 50) : 0));
				style.setProperty("--dsh-aqua-brightness-white", String(dark ? 0 : Math.max(0, (this.settings.bgBrightness - 50) / 50)));
				const compat = this.settings.mode === "compat";
				document.documentElement.toggleAttribute("data-dsh-float", !compat);
				document.documentElement.toggleAttribute("data-dsh-compat", compat);
				style.setProperty("--dsh-nico-scrim", String(this.settings.scrim / 100));
				style.setProperty("--dsh-nico-scrim-blur", `${this.settings.scrimBlur}px`);
				document.documentElement.toggleAttribute("data-dsh-nico-scrim", this.settings.scrim > 0 || this.settings.scrimBlur > 0);
				syncGlassPanes(this.glassPaneParams());
				const ambient = document.querySelector("[data-dsh-aqua-ambient]");
				if (ambient !== null) ambient.dataset.background = this.settings.background;
				const wallpaper = this.settings.wallpaper;
				const isVideo = wallpaper.startsWith("data:video/") || wallpaper.startsWith("idb:") || wallpaper.startsWith("fsa:");
				const wallpaperLayer = document.querySelector("[data-dsh-aqua-wallpaper-layer]");
				if (wallpaperLayer !== null) {
					wallpaperLayer.dataset.background = this.settings.background;
					wallpaperLayer.dataset.media = isVideo ? "video" : "image";
				}
				const wallpaperOn = this.settings.background === "wallpaper" && wallpaper !== "";
				document.documentElement.toggleAttribute("data-dsh-aqua-wallpaper", wallpaperOn);
				if (wallpaperOn) document.documentElement.setAttribute("data-dsh-aqua-media", isVideo ? "video" : "image");
				else document.documentElement.removeAttribute("data-dsh-aqua-media");
				const img = document.querySelector("[data-dsh-aqua-wallpaper-img]");
				if (img !== null) {
					if (this.settings.background === "wallpaper" && wallpaper !== "" && !isVideo) img.src = wallpaper;
					else img.removeAttribute("src");
				}
				const video = document.querySelector("[data-dsh-aqua-wallpaper-video]");
				if (video !== null) {
					if (this.settings.background === "wallpaper" && isVideo) {
						if (wallpaper.startsWith("idb:")) {
							const id = wallpaper.slice(4);
							if (this.videoBlobId === id && this.videoObjectUrl !== void 0) {} else loadVideoBlob(id).then((blob) => {
								if (blob === null) return;
								if (this.settings.wallpaper !== wallpaper) return;
								const url = URL.createObjectURL(blob);
								if (this.videoObjectUrl !== void 0) URL.revokeObjectURL(this.videoObjectUrl);
								this.videoObjectUrl = url;
								this.videoBlobId = id;
								video.setAttribute("src", url);
								this.configureWallpaperVideo(video);
							});
						} else if (wallpaper.startsWith("fsa:")) {
							if (this.videoBlobId === wallpaper && this.videoObjectUrl !== void 0) {} else loadVideoHandle().then(async (handle) => {
								if (handle === null) return;
								if (this.settings.wallpaper !== wallpaper) return;
								try {
									if (await handle.queryPermission({ mode: "read" }) !== "granted") return;
									const file = await handle.getFile();
									const url = URL.createObjectURL(file);
									if (this.videoObjectUrl !== void 0) URL.revokeObjectURL(this.videoObjectUrl);
									this.videoObjectUrl = url;
									this.videoBlobId = wallpaper;
									video.setAttribute("src", url);
									this.configureWallpaperVideo(video);
								} catch {}
							});
						} else if (video.getAttribute("src") !== wallpaper) {
							video.setAttribute("src", wallpaper);
							this.configureWallpaperVideo(video);
						}
					} else {
						video.pause();
						video.removeAttribute("src");
						video.load();
					}
				}
			}
			/** The wallpaper plays as a plain <video> element (the browser's own
			*  decoder, no player chrome at all): looping on, cover fill via CSS, and
			*  autoplay with a muted fallback where policy requires it. A direct
			*  element (not an iframe) keeps backdrop-filter working over it, so the
			*  glass panels stay frosted above the video. */
			configureWallpaperVideo(video) {
				video.loop = true;
				if (!video.paused) return;
				video.play().catch(() => {
					video.muted = true;
					video.play().catch(() => {});
				});
			}
			/** Apply the mode's token layer (floating palette, or translucent compat). */
			applyTokens() {
				this.tokenDisposer?.();
				this.tokenDisposer = this.ctx.theme.overrideTokens(OVERRIDE_SOURCE, this.settings.mode === "compat" ? COMPAT_TOKEN_OVERRIDES : AQUA_TOKEN_OVERRIDES);
			}
			mount() {
				document.documentElement.setAttribute(AQUA_ATTRIBUTE, "");
				ensureAmbientScene();
				ensurePageFades();
				this.applySettings();
				this.applyTokens();
				this.mountFluid();
				this.startSeamStamper();
				this.paneDisposer?.();
				this.paneDisposer = startGlassPanes(() => this.glassPaneParams());
				this.padDisposer?.();
				this.padDisposer = startReadingPads(() => this.enabled && (this.settings.scrim > 0 || this.settings.scrimBlur > 0));
			}
			unmount() {
				document.documentElement.removeAttribute(AQUA_ATTRIBUTE);
				document.documentElement.removeAttribute("data-dsh-float");
				document.documentElement.removeAttribute("data-dsh-compat");
				document.documentElement.removeAttribute("data-dsh-aqua-wallpaper");
				document.documentElement.removeAttribute("data-dsh-aqua-media");
				this.paneDisposer?.();
				this.paneDisposer = void 0;
				this.padDisposer?.();
				this.padDisposer = void 0;
				document.documentElement.removeAttribute("data-dsh-nico-scrim");
				document.documentElement.removeAttribute("data-dsh-nico-home");
				this.tokenDisposer?.();
				this.tokenDisposer = void 0;
				if (this.videoObjectUrl !== void 0) {
					URL.revokeObjectURL(this.videoObjectUrl);
					this.videoObjectUrl = void 0;
					this.videoBlobId = void 0;
				}
				this.teardownFluid();
				removeAmbientScene();
				removePageFades();
				this.seamDisposer?.();
				this.seamDisposer = void 0;
			}
			/** Attach the fluid shader and the interaction feeds. */
			mountFluid() {
				const mainCanvas = document.querySelector("[data-dsh-aqua-fluid-canvas]");
				try {
					if (mainCanvas !== null) this.mainFluid = attachFluidShader(mainCanvas, this.fluidParams());
					this.applyFluidPalettes();
					if (this.mainFluid !== void 0 && mainCanvas !== null) this.interactionDisposer = attachFluidInteractions({
						main: this.mainFluid,
						mainCanvas
					});
				} catch {
					this.mainFluid = void 0;
				}
			}
			teardownFluid() {
				this.interactionDisposer?.();
				this.interactionDisposer = void 0;
				this.mainFluid?.dispose();
				this.mainFluid = void 0;
			}
			fluidParams() {
				return {
					...SITE_FLUID_PARAMS,
					...fluidToneColors(this.dark, this.settings.fluidHue, this.settings.fluidDepth)
				};
			}
			applyFluidPalettes() {
				this.mainFluid?.setParams(this.fluidParams());
			}
			/** Stamp the data-* seams the stylesheet keys off (self-contained mode). */
			startSeamStamper() {
				if (this.seamDisposer !== void 0) return;
				this.seamDisposer = startSeamStamper();
			}
		};
		//#endregion
		//#region \0dsh-css:H:\WorkProj\dsh-nico-theme\src\client\aqua.module.css.mjs
		const css$1 = "[data-dsh-aqua] body{background:var(--dsw-alias-bg-base)}[data-dsh-aqua]{--dsh-nico-pane-radius:32px;--dsh-nico-blur:3px;--dsh-nico-brightness:1.1;--dsh-aqua-glass-line:#24262a38;--dsh-aqua-glass-line-soft:#24262a24}[data-dsh-aqua]:has(body[data-ds-dark-theme]){--dsh-aqua-glass-line:#dcdce02e;--dsh-aqua-glass-line-soft:#dcdce01f}[data-dsh-aqua] [data-dsh-frame]{background:0 0}[data-dsh-aqua] [id=root]{z-index:1;position:relative}[data-dsh-aqua] [data-phase],[data-dsh-aqua] [data-dsh-details]{background:0 0}[data-dsh-aqua][data-dsh-float] [data-dsh-nico-pane]{isolation:isolate;box-shadow:none;border-radius:var(--dsh-nico-pane-radius,32px);border-color:#0000;background:0 0!important}[data-dsh-aqua][data-dsh-float] [data-dsh-nico-pane]>[data-dsh-nico-pane-surface]{z-index:-1;pointer-events:none;border-radius:inherit;position:absolute;inset:0}[data-dsh-aqua][data-dsh-float] [data-dsh-nico-pane]>[data-dsh-nico-pane-surface] .ngs-surface{border-radius:inherit;position:absolute;inset:0}[data-dsh-aqua][data-dsh-float] [data-dsh-nico-pane]>[data-dsh-nico-pane-surface] .ngs-motion{transform:none!important}[data-dsh-aqua][data-dsh-float] [data-dsh-nico-pane]:not(:has(>[data-dsh-nico-pane-surface]>.ngs-surface)):before{content:\"\";z-index:-1;pointer-events:none;border-radius:inherit;backdrop-filter:blur(var(--dsh-nico-blur,3px)) saturate(100%) brightness(var(--dsh-nico-brightness,1.1));position:absolute;inset:0}[data-dsh-nico-pane] [data-dsh-nico-lean]:has([role=dialog]){translate:none!important}.ngs-surface,.ngs-surface *{box-sizing:border-box}[data-dsh-float] [data-phase=active] header{z-index:8;position:relative}[data-dsh-float] [class*=banner]{position:static}[data-dsh-float] [data-phase=active] [data-conversation-scroll]{margin-top:-95px;padding-top:107px}[data-dsh-float] header{margin:12px 16px 0;padding:10px 16px 8px}[data-dsh-float] [data-dsh-frame][data-sidebar-collapsed] header{margin-left:28px}[data-dsh-aqua] [data-phase] [class*=composerSeat][class*=composerSeat]{background:0 0}[data-dsh-aqua] [data-dsh-aqua-ambient]{z-index:-1;pointer-events:none;background:radial-gradient(760px 420px at 50% -8%,#a0c8ff42,#0000 70%),linear-gradient(#9cc1e738 0%,#9cc1e700 38%),radial-gradient(900px 420px at 50% 108%,#9cc1e724,#0000 70%);position:fixed;inset:0;overflow:hidden}[data-dsh-aqua] body[data-ds-dark-theme] [data-dsh-aqua-ambient]{background:radial-gradient(760px 420px at 50% -8%,#6ea5ff21,#0000 70%),linear-gradient(#5e8fe021 0%,#5e8fe000 46%),radial-gradient(900px 420px at 50% 108%,#5e8fe017,#0000 70%)}[data-dsh-aqua] [data-dsh-aqua-ambient]:after{content:\"\";background-image:linear-gradient(rgba(255, 255, 255, var(--dsh-aqua-brightness-white,0)), rgba(255, 255, 255, var(--dsh-aqua-brightness-white,0))), linear-gradient(rgba(0, 0, 0, var(--dsh-aqua-brightness-black,0)), rgba(0, 0, 0, var(--dsh-aqua-brightness-black,0)));position:absolute;inset:0}@media (prefers-reduced-motion:no-preference){[data-dsh-aqua] [data-dsh-aqua-ambient]{animation:wrr-ba_dsh-aqua-breathe 9s var(--ds-ease-in-out) infinite alternate}}@keyframes wrr-ba_dsh-aqua-breathe{0%{opacity:.86}to{opacity:1}}[data-dsh-aqua] [data-dsh-aqua-fluid-canvas]{width:100%;height:100%;position:absolute;inset:0}[data-dsh-aqua] [data-dsh-aqua-wallpaper]{z-index:-1;position:fixed;inset:0;overflow:hidden}[data-dsh-aqua] [data-dsh-aqua-wallpaper-img]{object-fit:cover;width:100%;height:100%;filter:blur(var(--dsh-aqua-wallpaper-blur,0px))}[data-dsh-aqua] [data-dsh-aqua-wallpaper-video]{object-fit:cover;pointer-events:none;width:100%;height:100%;filter:blur(var(--dsh-aqua-video-blur,0px));border:0;position:absolute;inset:0}[data-dsh-aqua] [data-dsh-aqua-wallpaper]:after{content:\"\";background:rgb(255 255 255/var(--dsh-aqua-wallpaper-frost,0));pointer-events:none;position:absolute;inset:0}[data-dsh-aqua] body[data-ds-dark-theme] [data-dsh-aqua-wallpaper]:after{background:rgb(12 18 27/var(--dsh-aqua-wallpaper-frost,0))}[data-dsh-aqua] [data-dsh-aqua-wallpaper][data-media=video]:after{background:rgb(255 255 255/calc(var(--dsh-aqua-video-dim,.36) * 1.3));display:block}[data-dsh-aqua] body[data-ds-dark-theme] [data-dsh-aqua-wallpaper][data-media=video]:after{background:rgb(8 12 20/var(--dsh-aqua-video-dim,.36))}[data-dsh-aqua] [data-dsh-aqua-ambient][data-background=wallpaper] [data-dsh-aqua-fluid-canvas],[data-dsh-aqua] [data-dsh-aqua-wallpaper][data-background=fluid]{display:none}[data-dsh-float] [role=menu],[data-dsh-float] [role=dialog],[data-dsh-float] [role=alert],[data-dsh-float] [data-dsh-surface]:not([data-dsh-nico-pane]){border-radius:14px}[data-dsh-float] [role=menuitem],[data-dsh-float] [role=tooltip],[data-dsh-float] [class*=pill]{border-radius:8px}[data-dsh-float] button[class*=button]{border-radius:10px}[data-dsh-float] [class*=iconButton],[data-dsh-float] [class*=searchButton]{border-radius:8px}[data-dsh-float] [data-dsh-add]{border:1px solid var(--dsh-aqua-glass-line-soft);backdrop-filter:blur(var(--dsh-nico-blur,3px));background:#ffffff6b;box-shadow:inset 0 1px #ffffff80}[data-dsh-float] [data-dsh-add]:hover:not(:disabled){background:#ffffff94}[data-dsh-float] body[data-ds-dark-theme] [data-dsh-add]{border-color:var(--dsh-aqua-glass-line-soft);background:#2a2e386b;box-shadow:inset 0 1px #ffffff14}[data-dsh-float] body[data-ds-dark-theme] [data-dsh-add]:hover:not(:disabled){background:#363a4685}[data-dsh-float] [class*=bubble]{border-radius:14px}html[data-dsh-float][data-dsh-aqua-wallpaper][data-dsh-aqua-media=video] [class*=bubble]{border-color:var(--dsh-aqua-glass-line-soft);background:#ffffffb3}html[data-dsh-float][data-dsh-aqua-wallpaper][data-dsh-aqua-media=video] body[data-ds-dark-theme] [class*=bubble]{border-color:var(--dsh-aqua-glass-line-soft);background:#00000080}[data-dsh-float] [class*=card]:not([data-dsh-nico-pane]){border-radius:14px}[data-dsh-aqua][data-dsh-float] [data-dsh-inputbar]:has([data-dsh-stats]){width:calc(var(--dsh-chat-content-width) + 32px);max-width:none;margin:0 auto 12px;padding:0}[data-dsh-float] [data-dsh-inputbar]:has([data-dsh-stats]) [data-composer-card]{box-shadow:none;backdrop-filter:none;background:0 0;border:none;border-radius:0}[data-dsh-float] [data-dsh-inputbar]:has([data-dsh-stats]) [data-composer-card]:after{display:none}[data-dsh-float] [data-dsh-inputbar]:has([data-dsh-stats]) [data-dsh-stats]{box-sizing:border-box;border:none;border-top:1px solid var(--dsh-aqua-glass-line-soft);width:100%;max-width:none;min-height:24px;box-shadow:none;backdrop-filter:none;background:0 0;border-radius:0;margin:auto 0 0;padding:2px 16px;display:block}[data-dsh-float] body[data-ds-dark-theme] [data-dsh-inputbar]:has([data-dsh-stats]) [data-dsh-stats]{border-top-color:var(--dsh-aqua-glass-line-soft)}[data-dsh-float] [data-dsh-inputbar]:not([class*=hero]){padding-bottom:12px}[data-dsh-float] [data-dsh-stats]{z-index:8;color:#262e3ee6;position:relative}[data-dsh-float] body[data-ds-dark-theme] [data-dsh-stats]{color:#e4ecf8eb}[data-dsh-float] [data-composer-card] textarea::placeholder{color:#37405480}[data-dsh-float] body[data-ds-dark-theme] [data-composer-card] textarea::placeholder{color:#cdd8ea85}[data-dsh-float] [class*=block]{--dsl-code-block-border-radius:14px;--dsl-diff-radius:14px;--dsl-read-radius:14px;--dsl-terminal-radius:14px;--dsl-web-radius:14px;--dsl-search-radius:14px;border-radius:14px}[data-dsh-float] [class*=sidebarCol]{z-index:9;margin:12px;padding:10px 12px 14px;position:relative}[data-dsh-float] [data-dsh-frame]:not([data-sidebar-collapsed]) [class*=sidebarCol]{overflow:visible!important}[data-dsh-float] [class*=sidebarCol] [data-slot=sidebar]>*{z-index:1;position:relative}[data-dsh-float] [data-dsh-frame][data-sidebar-collapsed] [class*=sidebarCol]{transition:margin .15s var(--ds-ease-in-out), border-radius .15s var(--ds-ease-in-out);border-radius:16px;margin:12px -12px 12px 12px;padding:0;overflow:hidden!important}[data-dsh-float] [data-dsh-frame]:not([data-sidebar-collapsed]) [data-dsh-sidebar-root]{width:100%!important}[data-dsh-aqua][data-dsh-float] [class*=sidebarCol]:has([role=dialog]){z-index:20000;overflow:visible}[data-dsh-float] [data-dsh-trajectory]{width:calc(100% - 32px);height:calc(100% - 20px);margin:8px 16px 12px;overflow:hidden}[data-dsh-float] [data-dsh-trajectory] [role=toolbar],[data-dsh-float] [data-dsh-trajectory] section[aria-label=Trajectory\\ timeline]{background:0 0}[data-dsh-float] [role=menu]{backdrop-filter:blur(var(--dsh-nico-blur,3px));background:#ffffff9e}[data-dsh-float] body[data-ds-dark-theme] [role=menu]{background:#1c202aad}[data-dsh-float] [role=treeitem][aria-selected=true]{box-shadow:inset 2px 0 0 var(--dsw-specific-sidebar-nav-item-active-accent), 0 0 16px #6e9be824}[data-dsh-float] button[class*=button]:hover:not(:disabled),[data-dsh-float] [role=menuitem]:hover:not(:disabled){box-shadow:0 0 12px #6e9be829, inset 0 0 0 1px var(--dsh-aqua-glass-line-soft)}[data-dsh-aqua] [data-dsh-aqua-fade]{z-index:7;pointer-events:none;backdrop-filter:blur(5px);background:#fff3;height:13px;position:fixed;left:0;right:0}[data-dsh-aqua] body[data-ds-dark-theme] [data-dsh-aqua-fade]{background:#00000026}[data-dsh-aqua] [data-dsh-aqua-fade=top]{top:0;-webkit-mask-image:linear-gradient(#000 0%,#0000 100%);mask-image:linear-gradient(#000 0%,#0000 100%)}[data-dsh-aqua] [data-dsh-aqua-fade=bottom]{bottom:0;-webkit-mask-image:linear-gradient(#0000 0%,#000 100%);mask-image:linear-gradient(#0000 0%,#000 100%)}[data-dsh-aqua] :focus-visible{outline-offset:1px;outline:2px solid #6e9be8d9}[data-dsh-aqua] ::selection{background:#6e9be859}[data-dsh-aqua] [data-conversation-scroll]{text-shadow:0 0 1px #0006}[data-dsh-aqua] body:not([data-ds-dark-theme]) [data-conversation-scroll]{text-shadow:0 0 1px #ffffff8c,0 1px 2px #10101214}[data-dsh-float] [role=dialog] h2{letter-spacing:.02em;font-family:Space Grotesk Variable,Noto Serif SC,Songti SC,STSong,SimSun,serif;font-weight:600}[data-dsh-float] [role=treeitem]{font-family:Space Grotesk Variable,Noto Serif SC,Songti SC,STSong,SimSun,serif;font-weight:500}[data-dsh-float] [data-phase=hero]{animation:wrr-ba_dsh-aqua-hero-in .32s var(--ds-ease-in-out)}[data-dsh-float] [data-phase=active]{animation:wrr-ba_dsh-aqua-active-in .3s var(--ds-ease-in-out)}[data-dsh-float] [data-testid^=view-]{animation:wrr-ba_dsh-aqua-view-in .26s var(--ds-ease-in-out)}[data-dsh-float] [class*=userRow]{animation:wrr-ba_dsh-aqua-rise .28s var(--ds-ease-in-out) both}[data-dsh-float] [data-tool]{animation:wrr-ba_dsh-aqua-rise .3s var(--ds-ease-in-out) both}[data-dsh-float] [role=dialog]{animation:wrr-ba_dsh-aqua-dialog-in .24s var(--ds-ease-in-out)}@keyframes wrr-ba_dsh-aqua-hero-in{0%{opacity:0}}@keyframes wrr-ba_dsh-aqua-active-in{0%{opacity:0}}@keyframes wrr-ba_dsh-aqua-view-in{0%{opacity:0}}@keyframes wrr-ba_dsh-aqua-rise{0%{opacity:0;transform:translateY(6px)}}@keyframes wrr-ba_dsh-aqua-dialog-in{0%{opacity:0;transform:translateY(8px)scale(.985)}}[data-dsh-aqua][data-dsh-nico-scrim] [data-dsh-nico-pad=assistant],[data-dsh-aqua][data-dsh-nico-scrim] [data-dsh-nico-pad=expand]{box-sizing:border-box;background:rgb(255 255 255/var(--dsh-nico-scrim,.25));min-width:0;max-width:100%;backdrop-filter:blur(var(--dsh-nico-scrim-blur,5px)) saturate(100%);border-radius:16px;padding:10px 16px;overflow:hidden}[data-dsh-aqua][data-dsh-nico-scrim] body[data-ds-dark-theme] [data-dsh-nico-pad=assistant],[data-dsh-aqua][data-dsh-nico-scrim] body[data-ds-dark-theme] [data-dsh-nico-pad=expand]{background:rgb(12 14 20/var(--dsh-nico-scrim,.25))}[data-dsh-aqua][data-dsh-nico-scrim] [data-dsh-nico-pad=user]{backdrop-filter:blur(var(--dsh-nico-scrim-blur,5px)) saturate(100%)}[data-dsh-aqua] [data-dsh-nico-pad] [class*=tableScroll],[data-dsh-aqua] [data-dsh-nico-pad] [class*=md-table-wide],[data-dsh-aqua] [data-dsh-nico-pad] .wrr-ba_md-table-wide,[data-dsh-aqua] [data-dsh-nico-table-wrap]{display:block;box-sizing:border-box!important;scrollbar-width:thin!important;scrollbar-color:var(--dsw-alias-scrollbar-bg-l2) #00000014!important;width:100%!important;max-width:100%!important;margin:8px 0!important;padding:0 0 6px!important;overflow-x:auto!important}[data-dsh-aqua] body[data-ds-dark-theme] [data-dsh-nico-pad] [class*=tableScroll],[data-dsh-aqua] body[data-ds-dark-theme] [data-dsh-nico-table-wrap]{scrollbar-color:var(--dsw-alias-scrollbar-bg-l2) #ffffff14!important}[data-dsh-aqua] [class*=tableScroll]::-webkit-scrollbar,[data-dsh-aqua] [data-dsh-nico-table-wrap]::-webkit-scrollbar{height:6px}[data-dsh-aqua] [class*=tableScroll]::-webkit-scrollbar-track,[data-dsh-aqua] [data-dsh-nico-table-wrap]::-webkit-scrollbar-track{background:#0000000f;border-radius:999px}[data-dsh-aqua] body[data-ds-dark-theme] [class*=tableScroll]::-webkit-scrollbar-track,[data-dsh-aqua] body[data-ds-dark-theme] [data-dsh-nico-table-wrap]::-webkit-scrollbar-track{background:#ffffff14}[data-dsh-aqua] [class*=tableScroll]::-webkit-scrollbar-thumb,[data-dsh-aqua] [data-dsh-nico-table-wrap]::-webkit-scrollbar-thumb{background:var(--dsw-alias-scrollbar-bg-l2);border-radius:999px}[data-dsh-aqua] [class*=tableScroll]::-webkit-scrollbar-thumb:hover,[data-dsh-aqua] [data-dsh-nico-table-wrap]::-webkit-scrollbar-thumb:hover{background:var(--dsw-alias-scrollbar-hover-l2)}[data-dsh-aqua] [data-dsh-nico-pad] table,[data-dsh-aqua] [data-dsh-nico-table-wrap] table{table-layout:auto!important;border-collapse:collapse!important;width:max-content!important;min-width:100%!important;max-width:none!important;margin:0!important}[data-dsh-aqua] [data-dsh-nico-pad] th,[data-dsh-aqua] [data-dsh-nico-pad] td,[data-dsh-aqua] [data-dsh-nico-table-wrap] th,[data-dsh-aqua] [data-dsh-nico-table-wrap] td{overflow-wrap:break-word;word-break:normal}[data-dsh-aqua] [data-dsh-nico-pad] th:first-child,[data-dsh-aqua] [data-dsh-nico-pad] td:first-child,[data-dsh-aqua] [data-dsh-nico-table-wrap] th:first-child,[data-dsh-aqua] [data-dsh-nico-table-wrap] td:first-child{white-space:nowrap;width:1%}[data-dsh-aqua][data-dsh-nico-scrim] [data-dsh-nico-pad=assistant] pre,[data-dsh-aqua][data-dsh-nico-scrim] [data-dsh-nico-pad=expand] pre{white-space:pre;-webkit-overflow-scrolling:touch;max-width:100%;overflow-x:auto}[data-dsh-aqua][data-dsh-nico-home] [data-dsh-nico-pad]{backdrop-filter:none;background:0 0;padding:0}@media (prefers-reduced-transparency:reduce){[data-dsh-aqua][data-dsh-float] [data-dsh-nico-pane]:not(:has(>[data-dsh-nico-pane-surface]>.ngs-surface)):before{backdrop-filter:none;background:#ffffffb8}[data-dsh-aqua] body[data-ds-dark-theme] [data-dsh-nico-pane]:not(:has(>[data-dsh-nico-pane-surface]>.ngs-surface)):before{background:#111a27c7}[data-dsh-aqua][data-dsh-nico-scrim] [data-dsh-nico-pad]{backdrop-filter:none}}[data-dsh-compat] [role=menu],[data-dsh-compat] [role=tooltip],[data-dsh-compat] [class*=card],[data-dsh-compat] [class*=bubble],[data-dsh-compat] [class*=panel],[data-dsh-compat] [class*=popover],[data-dsh-compat] [class*=dropdown]{backdrop-filter:blur(12px)}@media (prefers-reduced-motion:reduce){[data-dsh-float] [data-phase=hero],[data-dsh-float] [data-phase=active],[data-dsh-float] [data-testid^=view-],[data-dsh-float] [class*=userRow],[data-dsh-float] [data-tool],[data-dsh-float] [role=dialog],[data-dsh-aqua] [data-dsh-aqua-ambient]{animation:none}}";
		const tagId$1 = "dsh-nico-theme/aqua.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-nico-theme";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region \0dsh-css:H:\WorkProj\dsh-nico-theme\src\client\fonts.module.css.mjs
		const css = "@font-face{font-family:Space Grotesk Variable;font-style:normal;font-display:swap;font-weight:300 700;src:url(data:font/woff2;base64,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)format(\"woff2-variations\");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Space Grotesk Variable;font-style:normal;font-display:swap;font-weight:300 700;src:url(data:font/woff2;base64,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)format(\"woff2-variations\");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Space Grotesk Variable;font-style:normal;font-display:swap;font-weight:300 700;src:url(data:font/woff2;base64,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)format(\"woff2-variations\");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}";
		const tagId = "dsh-nico-theme/fonts.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-nico-theme";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region src/client/index.ts
		/** Required services: theme override stack plus the settings-card surfaces. */
		const inject = [
			"theme",
			"slots",
			"locale"
		];
		/**
		* Client plugin body.
		* @param ctx - client cordis context.
		*/
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "ui-nico: settings dictionaries");
			const layer = new AquaLayer(ctx);
			const pluginStore = createAquaRowStore();
			const pageStore = createAquaRowStore();
			let pluginBound;
			let pageBound;
			let revision = 0;
			const payload = () => {
				const s = layer.getSettings();
				return {
					enabled: layer.getEnabled(),
					mode: s.mode,
					blur: s.blur,
					brightness: s.brightness,
					refraction: s.refraction,
					depth: s.depth,
					curvature: s.curvature,
					dispersion: s.dispersion,
					highlight: s.highlight,
					elasticity: s.elasticity,
					elasticityStrength: s.elasticityStrength,
					fluidHue: s.fluidHue,
					fluidDepth: s.fluidDepth,
					bgBrightness: s.bgBrightness,
					dark: layer.getDark(),
					background: s.background,
					wallpaper: s.wallpaper,
					wallpaperBlur: s.wallpaperBlur,
					wallpaperFrost: s.wallpaperFrost,
					videoBlur: s.videoBlur,
					videoBrightness: s.videoBrightness,
					scrim: s.scrim,
					scrimBlur: s.scrimBlur
				};
			};
			const sync = () => {
				const next = payload();
				pluginBound?.sync(next, revision);
				pageBound?.sync(next, revision);
				revision += 1;
			};
			ctx.effect(() => ctx.on("theme/change", () => {
				sync();
			}), "ui-nico: appearance scheme sync");
			const createInjected = () => ({
				setEnabled: (enabled) => {
					layer.setEnabled(enabled);
					sync();
				},
				setMode: (mode) => {
					layer.setMode(mode);
					sync();
				},
				setBlur: (blur) => {
					layer.setBlur(blur);
					sync();
				},
				setBrightness: (brightness) => {
					layer.setBrightness(brightness);
					sync();
				},
				setRefraction: (refraction) => {
					layer.setRefraction(refraction);
					sync();
				},
				setDepth: (depth) => {
					layer.setDepth(depth);
					sync();
				},
				setCurvature: (curvature) => {
					layer.setCurvature(curvature);
					sync();
				},
				setDispersion: (dispersion) => {
					layer.setDispersion(dispersion);
					sync();
				},
				setHighlight: (highlight) => {
					layer.setHighlight(highlight);
					sync();
				},
				setElasticity: (elasticity) => {
					layer.setElasticity(elasticity);
					sync();
				},
				setElasticityStrength: (elasticityStrength) => {
					layer.setElasticityStrength(elasticityStrength);
					sync();
				},
				setFluidHue: (fluidHue) => {
					layer.setFluidHue(fluidHue);
					sync();
				},
				setFluidDepth: (fluidDepth) => {
					layer.setFluidDepth(fluidDepth);
					sync();
				},
				setBgBrightness: (bgBrightness) => {
					layer.setBgBrightness(bgBrightness);
					sync();
				},
				setBackground: (background) => {
					layer.setBackground(background);
					sync();
				},
				setWallpaper: (wallpaper) => {
					layer.setWallpaper(wallpaper);
					sync();
				},
				setWallpaperBlur: (wallpaperBlur) => {
					layer.setWallpaperBlur(wallpaperBlur);
					sync();
				},
				setWallpaperFrost: (wallpaperFrost) => {
					layer.setWallpaperFrost(wallpaperFrost);
					sync();
				},
				setVideoBlur: (videoBlur) => {
					layer.setVideoBlur(videoBlur);
					sync();
				},
				setVideoBrightness: (videoBrightness) => {
					layer.setVideoBrightness(videoBrightness);
					sync();
				},
				authorizeVideo: () => {
					layer.authorizeVideo();
				},
				setScrim: (scrim) => {
					layer.setScrim(scrim);
					sync();
				},
				setScrimBlur: (scrimBlur) => {
					layer.setScrimBlur(scrimBlur);
					sync();
				}
			});
			const pluginInjected = (actions) => {
				pluginBound = actions;
				sync();
				return { setEnabled: createInjected().setEnabled };
			};
			const pageInjected = (actions) => {
				pageBound = actions;
				sync();
				return createInjected();
			};
			ctx.slots.inject("settings.plugin.item", () => ctx.slots.register({
				name: "settings.plugin.item",
				key: "nico",
				store: pluginStore,
				locale: NS,
				inject: pluginInjected
			}, AquaPluginCard));
			ctx.slots.inject("settings.section", () => ctx.slots.register({
				name: "settings.section",
				id: "nico",
				order: 90,
				label: () => ctx.locale.bind(NS)("aqua.pageTitle"),
				store: pageStore,
				locale: NS,
				inject: pageInjected
			}, NicoSettingsPage));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map