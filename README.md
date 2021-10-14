# Ticketing Application

A ticketing application built with microservices architecture.

Front-end : NextJS.
Back-end : TypeScript, Docker, Kubernetes, NATS streaming server and skaffold.

### Auth service

- 4 routes = signUp, signIn, signOut, currentUser
- Password encryption before key in to database
- JWT and cookies
- User model
- Tested using jest
- Set proxy
- 2 pods, Auth & Mongo(for Auth)
- Augmentation for current-user middleware

### Order service

- N/A

### Ticket service

- 4 routes - list all, create, update, show
- Ticket model - title, price, userId
- Tested using jest
- 2 pods, Ticket and Mongo(for Ticket)

### Payment service

- N/A

### Expiration service

- N/A

### Client side

- Use Next JS

### Common module

- the module contain codes for custom error, middleware that is reusable among all other services.
- can be install at @salikzquidz/common or @cygnetops/common
