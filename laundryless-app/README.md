# Laundrylockers
current user payload includes
accessToken: 
    "eyJhbGciOiJSUzI1NiIsImtpZCI6ImMwYTQwNGExYTc4ZmUzNGM5YTVhZGU5NTBhMjE2YzkwYjVkNjMwYjMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUmF5IFJlYXBlciIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMcmg4akZaZFZST1kyTnlaa3VzMHl2NEN5RnFXN2JpenhpWk1XV0JyT0pCYk1FWTQ4PXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2xhdW5kcnlsZXNzYXR4IiwiYXVkIjoibGF1bmRyeWxlc3NhdHgiLCJhdXRoX3RpbWUiOjE3MzYyMjg2NDEsInVzZXJfaWQiOiJhNkhHaFNoNHlVZG8za0U1TldhbFNDNnFGQ1UyIiwic3ViIjoiYTZIR2hTaDR5VWRvM2tFNU5XYWxTQzZxRkNVMiIsImlhdCI6MTczNjIyODY0MSwiZXhwIjoxNzM2MjMyMjQxLCJlbWFpbCI6InJheThyZWFwZXJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDE5ODY1MzY3MTQ4NTY4NDE0MTciXSwiZW1haWwiOlsicmF5OHJlYXBlckBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.KBq9hmDozsmtZQ744r5sF3xTpU5lKTa4vsjNDm7sssyx94BUdtr0KFrdY7wfCXOEtJ3nTwUMlBfqBdBzEz6VD5e6PzYfRVWN_OdCznr2i5IyAxqz7Vq0YVqZkUB_h12FQwWCJDgEho-dOCmpV0LW8_OFLWz2FqTTJsxInawTQMvhV06mlw0fXM7WvYo4ZEW4eQAwHJlEvByHoE2bTIHDc9lQuS8Q2D7mrFg1Mk-aS9c13G-CWEMCsSmSeat7ntv6RPE8gaX-RMNeVeXhZh6siNdxVtUzm7xKfoFLYwQOffztMLWnV-oveZ7x_m85RIiTAw6z7OuK0RT1zwZRgknsfQ"
auth: 
    AuthImpl {app: FirebaseAppImpl, heartbeatServiceProvider: Provider, appCheckServiceProvider: Provider, config: {…}, currentUser: _UserImpl, …}
displayName: 
    "Ray Reaper"
email: 
    "ray8reaper@gmail.com"
emailVerified: 
    true
isAnonymous: 
    false
metadata
: 
    UserMetadata {createdAt: '1736143797203', lastLoginAt: '1736228641376', lastSignInTime: 'Tue, 07 Jan 2025 05:44:01 GMT', creationTime: 'Mon, 06 Jan 2025 06:09:57 GMT'}
phoneNumber
: 
    null
photoURL
: 
    "https://lh3.googleusercontent.com/a/ACg8ocLrh8jFZdVROY2NyZkus0yv4CyFqW7bizxiZMWWBrOJBbMEY48=s96-c"
proactiveRefresh
: 
ProactiveRefresh {user: _UserImpl, isRunning: true, timerId: 58, errorBackoff: 30000}
providerData
: 
[{…}]
providerId
: 
"firebase"
reloadListener
: 
null
reloadUserInfo
: 
    {localId: 'a6HGhSh4yUdo3kE5NWalSC6qFCU2', email: 'ray8reaper@gmail.com', displayName: 'Ray Reaper', photoUrl: 'https://lh3.googleusercontent.com/a/ACg8ocLrh8jFZdVROY2NyZkus0yv4CyFqW7bizxiZMWWBrOJBbMEY48=s96-c', emailVerified: true, …}
stsTokenManager
: 
    _StsTokenManager {refreshToken: 'AMf-vBwmhLf1J1hFSM484GTauo2DPxq6AUWeeqKYFXvkxDENwq…mF3ex9l6yhwon4aKidZ1dmg8ShOlR-jeeNqDtTLDPpsW3HgMI', accessToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImMwYTQwNGExYTc4ZmUzNG…wQOffztMLWnV-oveZ7x_m85RIiTAw6z7OuK0RT1zwZRgknsfQ', expirationTime: 1736232241590}
tenantId
: 
null
uid
: 
    "a6HGhSh4yUdo3kE5NWalSC6qFCU2"
refreshToken
: 
(...)
[[Prototype]]
: 
Object



try {
        // Fetch user profile information
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        const userProfile = userDoc.data();
  
        // Check if address information is missing
        if (!userProfile.address || !userProfile.city || !userProfile.state || !userProfile.zipCode) {
          setErrorMessage("Please add your address in Profile Settings before placing an order.");
          return;
        }



TODO: add a new location /laundromat/and partner location information
