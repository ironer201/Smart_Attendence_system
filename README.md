# IMS — Information Management System for BAUET

An Android app built for **Bangladesh Army University of Engineering & Technology (BAUET)** to help Class Representatives (CRs) and the Head of Department (HOD) manage student data efficiently — replacing scattered messaging apps with a structured system.

## Features

- **Role-based login** — Separate dashboards for students/CRs and HOD/authority users
- **Attendance tracking** — Mark daily attendance per course with a dynamic student checklist
- **Assignment upload** — Capture or pick images and upload them to Firebase as Base64
- **Class test counter** — Track how many tests have been conducted per course
- **Absence reporting** — Log absences with course code, student ID, and reason
- **Student list manager** — Dynamically add/remove students with ID and name
- **Data persistence** — Local storage via SharedPreferences + Firebase Realtime Database

## Tech Stack

- **Language** — Java (Android)
- **Storage** — SharedPreferences (local), Firebase Realtime Database, Firebase Storage
- **UI** — Material 3, CardView, AppCompat
- **Build** — Gradle (APK included)

## Project Structure

```
src/main/java/com/app/testlogin/
├── MainActivity.java       # Login screen
├── page.java               # Student/CR dashboard
├── autormain.java          # Authority/HOD dashboard
├── attendence.java         # Mark attendance
├── attenden_list.java      # View attendance records
├── Assignment.java         # Upload assignment images
├── static_asi.java         # Assignment submission status
├── CT.java                 # Class test counter
├── absent.java             # Submit absence reason
├── absentlist.java         # View absence records
├── list.java               # Manage student list
├── chatbox.java            # Chat interface (placeholder)
├── threedays.java          # 3-day absent list (placeholder)
└── AppCompatActivity.java  # Custom stub class
```

## Credits

- **Developer** — Md. Zarif Noor (ironer201)
- **Designer** — Jannatul Naima Moon
- **Contributor** — Jihad Hasan Jwel (CT logic)
