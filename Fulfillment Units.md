---
title: Fulfillment Units and Item Policies.html
author: David Fuller
categories: alma
status: pending
date: '2019-12-27'

---

<p><a href="https://drive.google.com/drive/u/0/folders/0AMX3gScOWNv6Uk9PVA"><img src="https://www.gstatic.com/images/branding/product/2x/drive_24dp.png" alt="gdrive" width="24" height="24"></a></p>
<h1 id="fulfillment-units-item-policies-etc.">Fulfillment Units, Item Policies, etc.</h1>
<p><img src="https://ensia.com/wp-content/uploads/2015/10/feature_food_messaging_main-760x378.jpg" alt="Fulfillment"></p>
<h2 id="purpose-of-this-document">Purpose of this document</h2>
<p>This is an overview of fulfillment in Alma focusing on a few data elements that need attention following our migration in June of 2018.  Each element is described with illustrative examples and suggestions for use.</p>
<p>More importantly the intention is to avoid multiple one-on-one conservations, reach agreement on our goals, and implement changes in a way that make the best use of Alma.</p>
<p>Guiding principles:</p>
<ul>
<li>our primary goal is to serve our patrons</li>
<li>we cannot assume our patrons are in the building</li>
<li>we can accomplish more together than we can alone</li>
<li>simplicity is preferred</li>
<li>transparency is preferred</li>
</ul>
<h2 id="background">Background</h2>
<p>Our previous system used location, item type, and patron type as three variables that selected a loan rule.  This is no longer the case and we can use those data elements more effectively.</p>
<h3 id="fulfillment-units">Fulfillment Units</h3>
<p>Fulfillment Units are groups of locations, entirely behind the scenes, that share the same policies.  They <em>simplify</em> the organization of physical resources and their associated services in Primo VE.</p>
<p>Each fulfillment unit has a default <em>Terms of Use</em>, or collection of policies that amount to a contract between the patron and the library.</p>
<p><em><strong>example</strong></em>: the <code>CLOSED</code> fulfillment unit groups together non-circulating locations and the policy <code>isLoanable = false</code> is declared just once for all the items in its locations.</p>
<p>Within a fulfillment unit policies may be further determined by:</p>
<ul>
<li>User groups (faculty, student, etc)</li>
<li>Locations</li>
<li>Material Types (Book, DVD, etc.)</li>
<li>Item Policies</li>
</ul>
<p><em><strong>example</strong></em>: the Current Reading Area is a location in the <code>General</code> fulfillment unit, but items in this location circulate for three weeks, unlike the rest of the unit.  Since location is the sole factor for determining the policy it is the best choice in this case.</p>
<h3 id="material-types">Material Types</h3>
<p>Material Types are primarily descriptive and help categorize our inventory.  They may be useful to determine a separate policy, but in most cases an item policy is better.  Why?  Because Material Types (and Locations) have a significance of their own and should be assigned accordingly.</p>
<p><em><strong>example</strong></em>: we currently use an array of material types [DVD, laptop, etc.] to determine a two week loan.  This is not ideal.  If we acquire a DVD that needs a different loan period it needs a different material type (we use DVD-ROM) and then fall back on location to determine policy.</p>
<p>An Item Policy, “two week loan”, is more transparent, can be used for any item that circulates for two weeks, and liberates Location and Material Type from “policy service.”</p>
<h3 id="item-policies">Item Policies</h3>
<p>Item Policies provide a way to apply a separate policy for a single item or array of items when location or material type are not the best choice.  The only drawback is they need to be assigned (a location or material type requires no extra effort).</p>
<p><em><strong>example: bike helmets</strong></em> are loaned for an entire term regardless of their location.  We could create a new Material Type but there are only a few of these items.</p>
<h3 id="resource-types">Resource Types</h3>
<p>Primo VE implements “resource type” as a facet with labels such as 'Book", “Article”, etc., Primo also provides a label over each brief result.  It is important that these labels are correct and meaningful.</p>
<p>The values come from the MARC record.  For example, a book is <code>LDR/06 = (a OR t) AND LDR/07 = (m, c, OR d)</code>,   E-books might be <code>LDR/06 = (a OR t) AND LDR/07= (m, c, OR d) AND 008-23 = o</code></p>
<p>As you can see the standard is a bit loose.  Our non-MARC resources (i.e., articles) rely upon metadata supplied by the publishers and hopefully supported by Alma.</p>
<p>Alma also provides a way to assign custom values called “Local Resource Types”, that are keyed to MARC values.  These appear in Primo VE but have no effect on our underlying data.</p>
<p>For example, MARC provides “Realia” for 3-dimensional objects which assumes the item is in a research context.  This is misleading for our equipment items.  We can create a local resource labeled “Equipment” or “Loanable Technology” keyed to an existing MARC value.</p>
<p>Consider these results from the <a href="https://union-psb.primo.exlibrisgroup.com/discovery/search?query=title,contains,hdmi&amp;tab=Everything&amp;search_scope=MyInst_and_CI&amp;vid=01UCNY_INST:01UCNY_INST&amp;lang=en&amp;offset=0">sandbox</a> and our <a href="https://union.primo.exlibrisgroup.com/discovery/search?query=title,contains,hdmi&amp;tab=Everything&amp;search_scope=MyInst_and_CI&amp;vid=01UCNY_INST:01UCNY_INST&amp;lang=en&amp;offset=0">production environment</a>.</p>
<h2 id="solutions">Solutions?</h2>
<p>Material Type is preferred over Location<br>
Item Policy is preferred over Material Type</p>
<h3 id="locations">Locations</h3>
<blockquote>
<p>Use Locations to help our patrons determine where items are actually located, while they are viewing the records in Primo VE, or when applying the location facet.</p>
</blockquote>
<blockquote>
<p>Collapse locations that previously determined a loan period, for example, use just one location for Reserve and use item policy to distinguish loan periods.</p>
</blockquote>
<h3 id="material-types-1">Material Types</h3>
<blockquote>
<p>Use Material Type as a descriptive term to help identify an item and  for creating sets in Alma.  Remove unnecessary types such as DVD-ROM.</p>
</blockquote>
<blockquote>
<p>Identify and create new Material Types, especially for equipment, i.e., Adapters, Chargers, etc.</p>
</blockquote>
<h3 id="resource-types-1">Resource Types</h3>
<blockquote>
<p>Use Alma’s Local Resource Types when appropriate for better identification in Primo VE.  The Resource Type for broad categories and the Material Type in the full record for a more specific descriptor.</p>
</blockquote>

