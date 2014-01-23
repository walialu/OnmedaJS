/**
 * Inserts a node after another node.
 * @function
 * @param parentNode The parent node.
 * @param newNode The node that should be inserted after referenceNode.
 * @param referenceNode newNode will be inserted after this node.
 * @example &lt;div id="moo1"&gt;&lt;span&gt;moo2&lt;/span&gt;&ltdiv&gt;&lt;/div&gt;&lt/div&gt;<br/>
 * &lt;script&gt;<br/>
 * var newNode = document.createElement('h1');<br/>
 * newNode.innerHTML = 'The most mooish title ever!';<br/>
 * onmeda.utils.insert_after( $('#moo1'),newNode,$('moo1').firstChild);<br/>
 * &lt;/script&gt;
 */
window.onmeda.utils.insert_after = function ( parentNode, newNode, referenceNode ) {
	parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
