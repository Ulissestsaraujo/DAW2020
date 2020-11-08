<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
   <xsl:template match="/">
       <xsl:result-document href="index.html">
       <html style="background-color:lightgrey;">
           <head>
               <title>Arquivo Arqueológico</title>
           </head>
           
           <body>
               <h2>Arquivo Arqueológico</h2>
               <h3>Indíce de Arqueosítios</h3>
               <ol>
                   <xsl:apply-templates select="//ARQELEM" mode="indice">
                       <xsl:sort select="IDENTI"/>
                   </xsl:apply-templates>
               </ol>
           </body>
       </html>
       </xsl:result-document>
       <xsl:apply-templates select="//ARQELEM" mode="spages">
           <xsl:sort select="IDENTI"/>
       </xsl:apply-templates>
   </xsl:template>  
    
    <!-- Template de indice -->
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="i{position()}"/>
            <a href="http://localhost:7777/arqs/{position()}">
                <xsl:value-of select="IDENTI"/></a>
        </li>
        
    </xsl:template>      
    <!-- Template conteudo -->
    
    <xsl:template match="ARQELEM" mode="spages">
        
        <xsl:result-document href="site/arq{position()}.html">
            <html>
                <head>
                    <title>
                        <xsl:value-of select="IDENTI"/>
                    </title>
                </head>
                <body>
                    <h2>Identificação: <xsl:value-of select="IDENTI"/></h2>
                    <p><b>Tipo: </b> <xsl:value-of select="TIPO"/></p>
                    
                    <p><b>Imagem: </b></p> <img src="{IMAGEM/@NOME}"/>
                    <p><b>Descrição:</b> <xsl:value-of select="Descri"/></p>
                    <p><b>Crono: </b> <xsl:value-of select="CRONO"/></p>
                    <p><b>Lugar: </b> <xsl:value-of select="LUGAR"/></p>
                    <p><b>Freguesia: </b> <xsl:value-of select="FREGUE"/></p>
                    <p><b>Concelho: </b> <xsl:value-of select="CONCEL"/></p>
                    <p><b>Código Administrativo: </b> <xsl:value-of select="CODADM"/></p>
                    <p><b>Latitude: </b> <xsl:value-of select="LATITU"/></p>
                    <p><b>Longitude: </b> <xsl:value-of select="LONGIT"/></p>
                    <p><b>Acesso: </b> <xsl:value-of select="ACESSO"/></p>
                    <p><b>Enquadramento: </b> <xsl:value-of select="QUADRO"/></p>
                    <p><b>Trajeto Arqueológico: </b> <xsl:value-of select="TRAARQ"/></p>
                    <p><b>Desenho Arqueológico: </b> <xsl:value-of select="DESARQ"/></p>
                    <p><b>Interpretação: </b> <xsl:value-of select="INTERP"/></p>
                    <p><b>Depósitos:</b> <xsl:value-of select="DEPOSI"/></p>
                    <p><b>Interesses: </b> <xsl:value-of select="INTERE"/></p>
                    <p><b>Bibliografia: </b> <xsl:value-of select="BIBLIO"/></p>
                    <p><b>Autor: </b> <xsl:value-of select="AUTOR"/></p>
                    <p><b>Data: </b> <xsl:value-of select="DATA"/></p>
                    <address><a href="index.html#i{position()}">Voltar ao índice</a></address>
                </body>
            </html>
        </xsl:result-document>
        
    </xsl:template>
 
    
</xsl:stylesheet>