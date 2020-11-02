<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
   <xsl:template match="/">
       <html style="background-color:lightgrey;">
           <head>
               <title>Arquivo Arqueológico</title>
           </head>
           <body>
               <h2>Arquivo Arqueológico</h2>
               <table border="1" width="100%">
                   <tr>
                   <td width="30%" valign="top">
                   <h3>Indice de Locais</h3>
                   <ol>
                       <xsl:apply-templates select="//ARQELEM" mode="indice">
                           <xsl:sort select="IDENTI"></xsl:sort>
                       </xsl:apply-templates>
                   </ol>
                   </td>
                   <td width="70%" valign="top">
                       <xsl:apply-templates select="//ARQELEM" mode="conteudo"></xsl:apply-templates>
                   </td>
                   </tr>
               </table>
           </body>
       </html>
   </xsl:template>  
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
        <a name="i{generate-id()}"/>
        <a href="#{generate-id()}"><xsl:value-of select="IDENTI"/></a>
        </li>
    </xsl:template>
    
    <xsl:template match="ARQELEM" mode="conteudo">
        <a name="{generate-id()}"></a>
        <h2>Identificação: <xsl:value-of select="IDENTI"/></h2>
        <p><b>Tipo: </b> <xsl:value-of select="TIPO"/></p>
        
        <p><b>Imagem: </b><xsl:value-of select="IMAGEM/@Nome"/></p>
        <p><b>Descrição:</b> <xsl:value-of select="Descri"/></p>
        <p><b>Crono: </b> <xsl:value-of select="CRONO"/></p>
        <p><b>Lugar: </b> <xsl:value-of select="LUGAR"/></p>
        <p><b>Freguesia: </b> <xsl:value-of select="FREGUE"/></p>
        <p><b>Concelho: </b> <xsl:value-of select="CONCEL"/></p>
        <p><b>CODADM: </b> <xsl:value-of select="CODADM"/></p>
        <p><b>Latitude: </b> <xsl:value-of select="LATITU"/></p>
        <p><b>Longitude: </b> <xsl:value-of select="LONGIT"/></p>
        <p><b>Acesso: </b> <xsl:value-of select="ACESSO"/></p>
        <p><b>Quadro: </b> <xsl:value-of select="QUADRO"/></p>
        <p><b>TRAARQ: </b> <xsl:value-of select="TRAARQ"/></p>
        <p><b>DESARQ: </b> <xsl:value-of select="DESARQ"/></p>
        <p><b>INTERP: </b> <xsl:value-of select="INTERP"/></p>
        <p><b>Depósitos:</b> <xsl:value-of select="DEPOSI"/></p>
        <p><b>Interesses: </b> <xsl:value-of select="INTERE"/></p>
        <p><b>Bibliografia: </b> <xsl:value-of select="BIBLIO"/></p>
        <p><b >Autor: </b> <xsl:value-of select="AUTOR"/></p>
        <p><b>Data: </b> <xsl:value-of select="DATA"/></p>
        
        <address>
            [<a href="#i{generate-id()}">Voltar ao índice</a>]
        </address>
        <center>
            <hr width="80%"/>
        </center>
    </xsl:template>
    
</xsl:stylesheet>