module.exports = {
  generate: (name) => {
    return `
          <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
      
           <div>The concept here is there will be a bunch of CSS/HTML that gets pasted here. Use template literals, like ${name} to add variables to the HTML and customize things like names, contact info, phone numbers, addresses, etc.</div>
  
          </html>
      `;
  },
  generatePlainText: (name) => {
    return `
        Hi ${name}!
        Here we have the plaintext version that will be sent along the HTML version for a fallback.
    `;
  }
}
