**Shibboleth & WAYFless URLs** - *a brief guide, defining terms around Shibboleth.*

>“*We are who we pretend to be, so we ought to be careful who we pretend to be*”
-Kurt Vonnegut, Mother Night

***Shibboleth*** : an authentication method that uses SAML: [^1] to prove your identity.  A username/password is requested just once enabling access to any shibboleth enabled resource in a browser session.

***Okta*** is currently the vendor that serves as our Identity Provider (IdP).  Okta provides a bridge to InCommon, so a SAML assertion directed to InCommon will be routed to Okta.

***InCommon Federation*** (https://incommon.org/federation) maintains a directory of its members and their metadata. InCommon includes most "US Higher Education" institutions and vendors.  An important item of metadata is our entityID.

***WAYF*** stands for “Where Are You From.” After we (Union College) register with a content provider they add us to a list, usually accessed through an “Institutional Login.” After we select “Union College” they know our school and our entityID.

***WAYFless URL*** is one that mercifully avoids *all of this*, i.e., finding the “Institutional Login”, choosing the federation (US Higher Education) and searching/scrolling for Union College.
It needs three elements:

- vendor URL: `https://example.com/Shibboleth.sso`
- Union College: `https://sso.union.edu/shibboleth/sso` 
- target: `https://example.com/database`

It will look something like this:

`https://example.com/Shibboleth.sso?entityID=https://sso.union.edu/shibboleth/sso&target=https://example.com/database`

-------------------------------

Below are WAYFless URLs for some of our subscription databases.  Please test them and use them in your Libguides, finding aids, etc. a variable element in each one is a code or identifier for the specific resource. ⇩


|  Vendor:Database | URL |
|:-----------------|:----|
|Archives Unbound: Alexander III  |[http://go.gale.com/gdsc/i.do?id=3FIW&v=2.1&u=nysl\_ca\_unionc&it=aboutCollections&p=GDSC&sw=w](https://www.google.com/url?q=http://go.gale.com/gdsc/i.do?id%3D3FIW%26v%3D2.1%26u%3Dnysl_ca_unionc%26it%3DaboutCollections%26p%3DGDSC%26sw%3Dw&sa=D&ust=1577228952009000) |
|Proquest: ABI Inform |[http://search.proquest.com/abicomplete/shibboleth?accountid=14637](https://www.google.com/url?q=http://search.proquest.com/abicomplete/shibboleth?accountid%3D14637&sa=D&ust=1577228952010000)|
|EBSCO: Academic Search Premier|[https://search.ebscohost.com/login.aspx?profile=ehost&defaultdb=aph&authtype=shib&custid=s5179723](https://www.google.com/url?q=https://search.ebscohost.com/login.aspx?profile%3Dehost%26defaultdb%3Daph%26authtype%3Dshib%26custid%3Ds5179723&sa=D&ust=1577228952011000)
|Gale: Academic OneFile|[https://infotrac.gale.com/itweb/nysl\_ca\_unionc?db=AONE](https://www.google.com/url?q=https://infotrac.gale.com/itweb/nysl_ca_unionc?db%3DAONE&sa=D&ust=1577228952012000)|
|Alexander Street: Anthropology Online|[https://shibboleth-sp.prod.proquest.com/Shibboleth.sso/DS?SAMLDS=1&target=https://search.alexanderstreet.com/anto&entityID=https://sso.union.edu/idp/shibboleth](https://www.google.com/url?q=https://shibboleth-sp.prod.proquest.com/Shibboleth.sso/DS?SAMLDS%3D1%26target%3Dhttps://search.alexanderstreet.com/anto%26entityID%3Dhttps://sso.union.edu/idp/shibboleth&sa=D&ust=1577228952013000)|
|Chadwyck: C19 Index|[http://shibboleth2.chadwyck.co.uk/shibbolethlogin?product=C19INDEX&location=US&returnpage=http://c19index.chadwyck.com&forward=/home.do&entityId=https://sso.union.edu/idp/shibboleth](http://shibboleth2.chadwyck.co.uk/shibbolethlogin?product=C19INDEX&location=US&returnpage=http://c19index.chadwyck.com&forward=/home.do&entityId=https://sso.union.edu/idp/shibboleth)|
|ArtStor|[https://shibbolethsp.jstor.org/start?entityID=https%3A%2F%2Fsso.union.edu%2Fidp%2Fshibboleth&site=artstor&dest=%2F](https://shibbolethsp.jstor.org/start?entityID=https%3A%2F%2Fsso.union.edu%2Fidp%2Fshibboleth&site=artstor&dest=%2F)|
|JSTOR |[[https://shibbolethsp.jstor.org/start?entityID=https%3A%2F%2Fsso.union.edu%2Fidp%2Fshibboleth&site=jstor&dest=%2F](https://shibbolethsp.jstor.org/start?entityID=https%3A%2F%2Fsso.union.edu%2Fidp%2Fshibboleth&site=jstor&dest=%2F)
|Elsevier:Science Direct|[https://auth.elsevier.com/ShibAuth/institutionLogin?entityID=https://sso.union.edu/idp/shibboleth&appReturnURL=https://www.sciencedirect.com](https://www.google.com/url?q=https://auth.elsevier.com/ShibAuth/institutionLogin?entityID%3Dhttps://sso.union.edu/idp/shibboleth%26appReturnURL%3Dhttps://www.sciencedirect.com&sa=D&ust=1577228952020000)|


[^1]: SAML assertions are XML documents exchanged between your browser, a remote resource and an Identity Provider (IdP) to authenticate, or prove who you are.  When successful your browser receives a token that is retained for the rest of the session (until you exit).  The token then proves who you are for every other shibboleth-enabled resource you access.

