# Core Launcher Play Data Safety Answer Sheet (Code-Based)

Last reviewed: March 1, 2026
Codebase audited: `C:\Users\prite\Documents\CoreApp`
Package: `com.scinecis.launcher`

## Evidence Sources
- App manifest: `app/src/main/AndroidManifest.xml`
- Merged manifest (debug): `app/build/intermediates/merged_manifest/debug/processDebugMainManifest/AndroidManifest.xml`
- Dependencies: `app/build.gradle.kts`, `gradle/libs.versions.toml`
- Telemetry code: `util/FirebaseEventLogger.kt`, `util/FirebasePerformanceTracker.kt`, `util/RemoteConfigManager.kt`
- Feature/data access code: contacts/calendar/weather/backup files under `app/src/main/java/com/scinecis/launcher/...`

## 1) SDK / Service Inventory (Actual)
- Firebase Analytics (`com.google.firebase:firebase-analytics:23.0.0`)
- Firebase Crashlytics (`com.google.firebase:firebase-crashlytics:20.0.4`)
- Firebase Performance (`com.google.firebase:firebase-perf:22.0.4`)
- Firebase Remote Config (`com.google.firebase:firebase-config:23.0.0`)
- Firebase transitive components seen in merged manifest:
  - Firebase Installations
  - Firebase Sessions
  - Google Play services measurement components
- OpenWeather API endpoints used directly in `WeatherRepository`.

## 2) Permissions (Current Release Build Inputs)
Declared in source manifest:
- `READ_CALENDAR`
- `INTERNET`
- `CALL_PHONE`
- `READ_CONTACTS`
- `USE_BIOMETRIC`
- `SYSTEM_ALERT_WINDOW`
- `QUERY_ALL_PACKAGES`
- Service bindings: Accessibility + Notification Listener

Added by dependencies in merged manifest:
- `USE_FINGERPRINT`
- `ACCESS_NETWORK_STATE`
- `WAKE_LOCK`
- `com.google.android.finsky.permission.BIND_GET_INSTALL_REFERRER_SERVICE`
- `com.google.android.gms.permission.AD_ID`
- `ACCESS_ADSERVICES_ATTRIBUTION`
- `ACCESS_ADSERVICES_AD_ID`

## 3) Data Flows That Leave Device (Observed)
- Firebase Analytics events for user actions and screen views.
- Firebase Crashlytics logs/custom keys (includes telemetry key/value pairs from app event logging).
- Firebase Performance traces/metrics/attributes.
- Firebase Remote Config fetches.
- OpenWeather network calls with user-provided weather location and API key.

Notable telemetry payload keys observed in app code:
- `package_name`, `app_label`, `contact_id`, `event_id`, `category_name`, `location`, `query_length`, feature toggles.

## 4) Recommended Play Console Data Safety Answers (Conservative)
Use these if shipping current code unchanged.

### Location
- Approximate location: **Collected = Yes**
- Shared = **Yes** (sent to OpenWeather and logged in analytics events where location string is included)
- Purpose(s): App functionality, Analytics
- Processing: Not required for core launcher; optional weather feature

### App Activity
- App interactions: **Collected = Yes**
- Shared = **Yes** (Firebase Analytics / Crashlytics telemetry)
- Purpose(s): Analytics, Developer communications (diagnostics), App functionality quality

### App Info and Performance
- Crash logs: **Collected = Yes**
- Diagnostics/performance data: **Collected = Yes**
- Shared = **Yes** (Firebase Crashlytics/Performance)
- Purpose(s): Analytics, Fraud prevention/security (if claimed), App stability

### Device or Other IDs
- Device or other IDs: **Collected = Yes**
- Shared = **Yes** (Firebase/Play services measurement stack; AD_ID permission present)
- Purpose(s): Analytics, attribution/measurement

## 5) High-Risk Review Notes (Action Items)
1. Telemetry currently logs potentially sensitive values (`package_name`, `contact_id`, weather `location`, and app labels) to Firebase analytics/crash keys.
   - If you want a lighter Data Safety disclosure, remove these fields or hash/coarsen them before logging.
2. `AD_ID` and `ACCESS_ADSERVICES_*` are present through transitive measurement dependencies.
   - If you do not need advertising identifier/attribution, remove/disable to reduce policy surface.
3. `allowBackup="true"` with broad/default backup rules can include sensitive local data (prefs/DB) in device/cloud backup flows.
   - Harden backup include/exclude rules before production.
4. `QUERY_ALL_PACKAGES` requires strict policy justification as a launcher core requirement.

## 6) Suggested Data Safety Narrative Snippets
- "Core Launcher uses Firebase Analytics, Crashlytics, Performance Monitoring, and Remote Config for product analytics, diagnostics, and feature configuration."
- "Core Launcher uses OpenWeather APIs for optional weather features configured by the user."
- "Core Launcher can access contacts/calendar/notification/accessibility/overlay features only when enabled and required for selected functionality."

## 7) Final Submission Gate
Before production upload:
- Re-run merged-manifest check.
- Re-run SDK/dependency check.
- Confirm policy page + Data Safety form + permission declarations are aligned.
- Keep screenshots and in-app disclosures consistent with declared behavior.
