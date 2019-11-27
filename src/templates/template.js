const generateRankedTable = rankedData => {
  let templateLine = '';
  rankedData.map(({ data }, index) => {
    templateLine = templateLine +  `<p
      style="font-family:Montserrat,&quot;Open Sans&quot;,sans-serif;margin:0px;color:rgb(255,255,255);
      font-size:18px;
      line-height:22.5px;
      max-width:550px;
      padding:0px 60px"
    >
      <font style="color:rgb(200,212,25)">${index + 1} &nbsp;|</font>&nbsp;<strong>${data.name}</strong>&nbsp;-&nbsp;
      <font style="color:rgb(200,212,25)">${data.consolidated} pontos</font>
    </p>
  <br>
`});

  return templateLine;
};

module.exports = {
  generate: ({ name, consolidated }, rankedData, order) => {
    return `
          <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
            <table cellspacing="0" cellpadding="0" border="0" align="center" width="100%"
            style="color:rgb(0,0,0);font-family:&quot;Times New Roman&quot;;font-size:medium;max-width:600px;border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
              <tbody>
                <tr>
                  <td>
                    <table bgcolor="#000000" style="border-spacing:0px;border-collapse:collapse;table-layout:fixed;margin:0px auto">
                      <tbody>
                        <tr>
                          <td><img
                              src="https://ci6.googleusercontent.com/proxy/zMtU9jeaj0Co_R_L7T-xu0QhgS9YRGcCFe7WIi257cx2K6gDVFf5jlelLlnYcuz7LyNBuLNnL6EqtytwtzO_7RVyQjXWzd6nnG_zFcTHoYRqQ0w4_yBszsmQuj-ep_4=s0-d-e1-ft#https://emailcdn.s3-sa-east-1.amazonaws.com/GrupoZAP/super-hero/header_1.gif"
                              width="100%" alt="Ranking Super Hero" style="outline:0px;max-width:600px" class="CToWUd"><br><br></td>
                        </tr>
                        <tr>
                          <td height="25"></td>
                        </tr>
                        <tr>
                          <td>
                            <p
                              style="font-family:Montserrat,&quot;Open Sans&quot;,sans-serif;margin:0px;color:rgb(255,255,255);font-size:18px;line-height:22.5px;max-width:550px;padding:0px 60px">
                              Olá ${name}!!</p>
                            <p
                              style="font-family:Montserrat,&quot;Open Sans&quot;,sans-serif;margin:0px;color:rgb(255,255,255);font-size:18px;line-height:22.5px;max-width:550px;padding:0px 60px">
                              <br></p>
                            <p
                              style="text-align:center;font-family:Montserrat,&quot;Open Sans&quot;,sans-serif;margin:0px;color:rgb(255,255,255);font-size:18px;line-height:22.5px;max-width:550px;padding:0px 60px">
                              <b><u>Você está com ${consolidated} Pontos</u></b></p>
                            <p
                              style="text-align:center;font-family:Montserrat,&quot;Open Sans&quot;,sans-serif;margin:0px;color:rgb(255,255,255);font-size:18px;line-height:22.5px;max-width:550px;padding:0px 60px">
                              <b>Sua posição no ranking hoje é ${order + 1}</b></p>
                            <p
                              style="text-align:center;font-family:Montserrat,&quot;Open Sans&quot;,sans-serif;margin:0px;color:rgb(255,255,255);font-size:18px;line-height:22.5px;max-width:550px;padding:0px 60px">
                              <br></p><br>
                            ${generateRankedTable(rankedData)}
                              <span>
                              <font color="#888888"><br></font>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td height="50"></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
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
