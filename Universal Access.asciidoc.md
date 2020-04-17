

= Universal Access to Library Resources
David Fuller <fullerd@union.edu>
:linkcss:
:icons: font
:hardbreaks:
:email: fullerd@union.edu
:name: David Fuller

The library selects and provides to many valuable academic resources.  We are now able (with help of our partners at ITS) to provide access to all of our resources, on any device, from anywhere in the world.  This is what is meant by "universal access."

The providers (vendors) naturally want to restrict access to members of organizations that have paid their bills. But keeping track of thousands of people in those thousands of organizations is beyond reason.

== Authentication

[TIP]
====
“*We are who we pretend to be, so we must be careful who we pretend to be*”
-_Kurt Vonnegut_, Mother Night
====


=== IP recognition


Traditionally, IP recognition has been preferred method...vendors recognize the IP address in the header of your HTTP request as your "credential" for authentication.  This is imperfect as it doesn't prove the identity of a human being or their membership in an organization.  At best it identifies a host computer as belonging to an organizational range of IP addresses.  Aside from possible hacking exploits, this method also provides access to anyone that happens to be on campus for any reason. including some who come expressly for that purpose.

It is not optimal for the library, either.  We may add or change our range of IP addresses.  In this case every single service provider that uses IP recognition must be updated, also.  There is an IP registry to help with this, but not every vendor utilizes it.

=== Virtual Private Network (VPN)

A VPN assigns an organizational IP address to a member located remotely, allowing the benefits of IP recognition.  They must authenticate with the VPN in order to be assigned an IP address, thus proving their membership.  All traffic is routed through the organization's network.

A VPN requires special software to connect on the network level, i.e., so that all network traffic is routed through the VPN.  This can be a barrier for some members.

=== Proxy Servers

A proxy server is similar to a VPN, authentication is required, and traffic is routed through the host.  Once authenticated, all traffic uses the IP address of the proxy.  An advantage is that any device can be used and no action is required by the end user.  Unlike the VPN, each remote resource that uses IP recognition needs to be configured and maintained.

TIP: The remote hostnames are rewritten by the proxy so that all further traffic is resolved and routed through it, i.e., proquest-com.proxy.edu



=== Shibboleth and Single Sign On (SSO)

Shibboleth is a name given to various means of authenticating a group member, usually a shared secret.  The digital version has been around for many years but has become more widely adopted due to the ubiquity of HTML5 anf the http protocol.  After authenticating once and the browser receives a unique token which is then recognized by any further "shibboleth aware" as proof of identity.

Shibboleth provides a higher level of security through encrypted exchanges with a remote application and a third party identity provider (IDP).  When accessing a remote resource you first identify "Where Are You From" (WAYF), usually a "Login via Your Institution" link.  This points to our orgganization's metadata which points to our Identity Provider.  Once authenticated by the IdP the browser is handed a token which authenticates you with other shibboleth enabled resources until you close the browser.

NOTE: It may seem odd that allowing a third party to manage passwords is more secure.  An analogy is securing valuables in your own home.  It feels safer but anyone that has access to your home may gain access to your valuables.  If they were in another location dedicated to security then anyone not  following a designated protocol would be immediately suspect.


image::./SAML.svg[Inline,height=400,width=1000,align=left]


=== Wayfless URLs

Identifying where you are from involves finding the link and scrolling through long lists.  WAYFless URLs encode all the information needed for authentication to take place without any effort by the user.  The three elements needed are the service providers authentication endpoint, your IdP and your destination.  It might look like this:

 https://sso.ebsco.com/Shibboleth.sso?  +  entityID=https://sso.union.edu/idp/shibboleth  +   &destination=https://absees.ebsco.com

.Real world examples
|===
|Alexander Street Press - Film Scripts Online

|The same URL can be used for every Alex St. if you substitute the database code.  In this url the code is *afso*
|https://shibboleth-sp.prod.proquest.com/Shibboleth.sso/DS?SAMLDS=1&target=https://search.alexanderstreet.com/afso&entityID=https://sso.union.edu/idp/shibboleth

|Elsevier
|Cell in column 1
|Cell in column 2
> Written with [StackEdit](https://stackedit.io/).
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE4OTE4NzI0OTFdfQ==
-->