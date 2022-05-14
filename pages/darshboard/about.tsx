import React from "react";
import { NextPage } from "next";
import styles from "./about.module.scss";
import { Layout } from "../../components/layouts";
import Image from "next/image";

const About: NextPage = () => {
  return (
    <Layout>
      <div style={{marginBottom:100}}>
        <header>
          <h1 className={styles["header__title"]}>ACERCA DE NOSOTROS...</h1>
        </header>

        <section className={styles["card"]}>
          <h2 className={styles["card__title"]}>
            BML Controls nace como un proyecto creado por dos estudiantes
            universitarios de la universidad peruana de ciencias aplicadas
            (upc). CON LA MOTIVACIÓN DE CREAR UN MODELO CAPAZ DE MEDIR LA
            MADUREZ BANCARIA DE LOS CONTROLES ACTUALES Y SER CAPACES DE
            OPTIMIZARLA.{" "}
          </h2>

         <div className={styles["flex-x-center"]} style={{textAlign:'center'}} >
            <div>
                <Image src={"/imgs/icon-profile.png"} width={300} height={180} alt="imagen"></Image>
                <p>IAN VALLEJOS</p>
            </div>
            <div>
                <Image src={"/imgs/icon-profile.png"} width={300} height={180} alt="imagen"></Image>
                <p>MAURICIO DE LA FLOR</p>
            </div>
          </div>
        </section>

        <header>
          <h1 className={styles["header__title"]}>AGRADECEMOS LA PARTICIPACIÒN DE LOS SIGUIENTES EXPERTOS</h1>
        </header>

        <section className={`${styles["card"]} ${styles["flex-x-center"]}`} style={{textAlign:'center'}}>

          <div>
            <Image src={"/imgs/icon-profile.png"} width={300} height={180} alt="imagen"></Image>
            <p>Product Owner</p>
            <p>JOSE CARLOS VARGAS</p>
          </div>
          <div>
            <Image src={"/imgs/icon-profile.png"} width={300} height={180} alt="imagen"></Image>
            <p>CoAutor</p>
            <p>JIMMY ARMAS</p>
          </div>
          <div>
            <Image src={"/imgs/icon-profile.png"} width={300} height={180} alt="imagen"></Image>
            <p>Portfolio Manager</p>
            <p>JORGE LUIS DELGADO</p>
          </div>
          <div>
            <Image src={"/imgs/icon-profile.png"} width={300} height={180} alt="imagen"></Image>
            <p>Experto en Seguridad TI</p>
            <p>FELIPE ROEL</p>
          </div>

        </section>
      </div>
    </Layout>
  );
};

export default About;
