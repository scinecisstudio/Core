# Hivemind

## Session Summary (2026-02-28)
- User asked to create `hivemind.md` and store concise, token-efficient session memory.
- Preference: keep carry-forward notes short so future chats need less re-explanation.
- Workspace root: `C:\Users\prite\Documents\Core`.
- Android app path on home PC: `C:\Users\prite\Documents\CoreApp`.
- Current session actions: created this file; added Core app privacy policy files at `C:\Users\prite\Documents\CoreApp\play-store\privacy-policy.md` and `C:\Users\prite\Documents\CoreApp\play-store\privacy-policy-site\index.html`; rolled back in-app privacy policy link/activity changes; added website-native privacy page at `C:\Users\prite\Documents\Core\privacy-policy.html`, linked it from website `index.html`, and expanded wording for Play Store-friendly disclosures (permissions, third parties, data usage, retention, user controls).
- Active constraint: do not perform write operations under `C:\Users\prite\Documents\CoreApp\app` unless explicitly requested.

## Session Summary (2026-03-01)
- User requested a stronger privacy-policy review for Google Play readiness and clearer transparency.
- Updated website policy page `C:\Users\prite\Documents\Core\privacy-policy.html` with a fuller disclosure structure:
- Added explicit developer identity/scope, detailed data categories, purpose mapping, SDK/library transparency (Firebase Analytics, Crashlytics, Performance, Remote Config, OpenWeather), permission-to-feature mapping, retention/deletion language, international processing note, user rights/controls, and Google Play declaration consistency guidance.
- Updated policy timestamp to March 1, 2026 and retained privacy contact `privacy@scinecis.com`.
- Added release checklist file `C:\Users\prite\Documents\Core\play-privacy-compliance-checklist.md` for Play submission verification and policy/data-safety drift prevention.
- Note for release process: policy text must always match actual app behavior and Play Console Data Safety + permission declarations for each new build.

## Session Summary (2026-03-01 - Data Safety Audit)
- Per user approval, audited `C:\Users\prite\Documents\CoreApp` manifest, merged manifest, dependencies, and telemetry code to derive a code-based Play Data Safety answer set.
- Found additional SDK-added permissions in merged manifest (including `AD_ID`, AdServices attribution permissions, `ACCESS_NETWORK_STATE`, `WAKE_LOCK`) and Firebase transitive components.
- Created `C:\Users\prite\Documents\Core\play-data-safety-answer-sheet.md` with conservative Play Console answers plus release risks/action items.
- Updated website privacy policy `C:\Users\prite\Documents\Core\privacy-policy.html` to reflect transitive SDK transparency and backup behavior.
- Updated checklist `C:\Users\prite\Documents\Core\play-privacy-compliance-checklist.md` to require merged-manifest and AD_ID/backups verification each release.
