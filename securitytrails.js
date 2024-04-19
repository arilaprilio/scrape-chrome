// Untuk scrape domain pada website securitytrails.com
// Gunakan pada url seperti berikut : https://securitytrails.com/list/ip/216.239.38.120

// https://github.com/arilaprilio

// Use document.documentElement.outerHTML to get the HTML content of the current page
var htmlContent = document.documentElement.outerHTML;

// Regular expression to match domain names within specific href links
var domainRegex = /href="\/domain\/(.*?)\/dns"/gi;
var match;
var domains = [];

// Extract all domains matching the pattern
while (match = domainRegex.exec(htmlContent)) {
    var domain = match[1];
    // Basic validation to exclude any unwanted capture groups or malformed domains
    if (domain && !domain.includes('%') && domain.includes('.')) {
        domains.push(domain);
    }
}

// Log domains to console
console.log(domains);

// Function to download the domains as a text file
function downloadDomains(domains) {
    var blob = new Blob([domains.join('\n')], { type: 'text/plain' });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'domains.txt';
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    }, 0);
}

// Call the function to download the file
downloadDomains(domains);
