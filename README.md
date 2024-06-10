# Tutor Galaxy
### a website for a Collaborative Study Platform
## [live link ](https://tutor-galaxy.web.app)
- Admin user name: Tutor Galaxy
- Admin email: ```md admin@tutor-galaxy.com```
- Admin Password ```txt admin-password ```

# Overview

Users can register with different roles on this website. There are three types of roles: Student, Tutor, and Admin. Each role has different capabilities.

For security, various private routes are created on the client side (e.g., admin route, tutor route, and student route), and JWT tokens are used on the server side. MongoDB is used for data management.

## As a Student:

1. A student must register first. After registration, they can book any study session. If the session is free, it can be booked by pressing the book button. If it is not free, the student must pay by card. Stripe is used as the payment gateway on this website. After booking a session, it will be added to their dashboard, where they can access it.
2. A student can access materials from the material route of the dashboard for sessions where the tutor provides materials.
3. Additionally, a student can create their own notes. They can edit and delete notes as needed.

## As a Tutor:

1. A tutor, after signing in, can create study sessions. Initially, sessions will be in a pending state. If the admin approves, they will become active. If the admin rejects a session, they must provide a reason and feedback, which the tutor can view on their dashboard. Tutors can re-submit requests for rejected sessions. Note that tutors cannot set the price of their sessions; only the admin can do that.
2. Tutors can edit and delete pending and rejected sessions but cannot edit or delete approved sessions.
3. Tutors can upload materials for their active/approved sessions and can edit or delete their uploaded materials.

## As an Admin:

1. The admin can manage users on their dashboard. This includes changing a user's role if needed. The admin can find a user by searching by name or email via the manage user route in the admin dashboard.
2. The admin can see all sessions in the All Sessions route of their dashboard. Sessions are shown in separate tabs according to their status:
   - The Pending tab shows pending sessions. Here, the admin can approve or reject a session. If they approve a session, they must set a price for it. If they reject a session, they must provide a reason and feedback.
   - Approved sessions appear in the Approved tab, where the admin can update or delete them.
   - Rejected sessions appear in the Rejected tab. The admin cannot edit or delete pending or rejected sessions.
3. There is a route in the admin dashboard to manage the materials provided in different sessions. The admin can update or delete any material if needed.
