import "./custom.css";
import emailjs from "@emailjs/browser";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import modèle from "./SVG/Fichier 1.svg";
import logo from "./SVG/Fichier 2.svg";
import nuage from "./SVG/Fichier 6.svg";
import rond from "./SVG/arrondidecoupe.svg";
import reuse from "./SVG/Fichier 3.svg";
import carré from "./SVG/carredecoupe.svg";
import modèleNoir from "./SVG/Fichier 1 noir.svg";
import nuageNoir from "./SVG/Fichier 6 noir.svg";
import rondNoir from "./SVG/arrondidecoupe noir.svg";
import reuseNoir from "./SVG/Fichier 3 noir.svg";
import carréNoir from "./SVG/carredecoupe noir.svg";
import { ChromePicker } from "react-color";
import { storage } from "./firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

function Custom() {
  const [border, setBorder] = useState("rond");
  const [logoK, setLogoK] = useState("Klik-logo");
  const [corner, setCorner] = useState("");
  const [bordure, setBordure] = useState(rond);
  const [footer, setFooter] = useState(nuage);
  const [background, setBackground] = useState("#f5a26c");
  const [footertext, setFootertext] = useState("nuage");
  const [colortext, setColortext] = useState("Blanc");
  const [reuseImg, setReuseImg] = useState(reuse);
  const [modèleImg, setModèleImg] = useState(modèle);
  const [noir, setNoir] = useState(false);
  const [imageUrl, setImageUrl] = useState([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [boutique, setBoutique] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [commentaire, setCommentaire] = useState("");

  const handleChangeComplete = (color) => {
    setBackground(color.hex);
  };
  const imageClear = () => {
    setImageUrl([]);
    setImgUrl([]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];

    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
        console.log(progresspercent)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  };

  const handleBorder = (event) => {
    setBorder(event.target.value);
    if (noir === true) {
      setBordure(carréNoir);
    } else {
      setBordure(carré);
    }
  };
  const handleBorder2 = (event) => {
    setBorder(event.target.value);
    if (noir === true) {
      setBordure(rondNoir);
    } else {
      setBordure(rond);
    }
  };

  const handleLogo = (event) => {
    if (event.target.value === "original") {
      setLogoK("Klik-logo");
      setCorner("");
    }
  };
  const handleLogo2 = (event) => {
    if (event.target.value === "custom") {
      setLogoK("Klik-logo-Custom");
      setCorner("Klik-corner");
    }
  };

  const handleFooter = (event) => {
    setFootertext(event.target.value);
    setFooter(nuage);
    if (noir === true) {
      setFooter(nuageNoir);
    }
  };
  const handleFooter2 = (event) => {
    setFootertext(event.target.value);
    setFooter();
    if (noir === true) {
      setFooter("");
    }
  };
  const handleColor = (event) => {
    setColortext(event.target.value);
    setNoir(false);
    setModèleImg(modèle);
    setReuseImg(reuse);

    if (footertext === "nuage") {
      setFooter(nuage);
    }
    if (border === "rond") {
      setBordure(rond);
    }
    if (border === "carré") {
      setBordure(carré);
    }
  };
  const handleColor2 = (event) => {
    setColortext(event.target.value);
    setNoir(true);
    setReuseImg(reuseNoir);
    setModèleImg(modèleNoir);
    if (footertext === "nuage") {
      setFooter(nuageNoir);
    }
    if (border === "rond") {
      setBordure(rondNoir);
    }
    if (border === "carré") {
      setBordure(carréNoir);
    }
  };
  const onCommentChange = (event) => {
    setCommentaire(event.target.value);
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
    console.log(email);
  };
  const onPhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const onBoutiqueChange = (event) => {
    setBoutique(event.target.value);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    let templateParams = {
      from_name: `${boutique}, email: ${email}`,
      to_name: "Cedric",
      logoK: `${logoK} `,
      border: `${border} `,
      footertext: `${footertext} `,
      colortext: `${colortext} `,
      background: `${background} `,
      email: `${email} `,
      phone: `${phone} `,
      boutique: `${boutique} `,
      commentaire: `${commentaire} `,
      imgUrl: `${imgUrl}`,
    };

    emailjs
      .send(
        "service_etu84j9",
        "template_xvann0o",
        templateParams,
        "tfFeQPI2B2NdeFth5"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
    alert("Votre design a bien été envoyé");
  };

  return (
    <div className="App">
      <header className="Container">
        <h1>Personnalisez votre KliK !</h1>
        <div className="Klik-box" style={{ backgroundColor: `${background}` }}>
          <img src={modèleImg} alt="Klik" className="Klik-modèle" />
          <div className={corner} />
          <img src={logo} alt="Klik" className={logoK} />
          <img src={footer} alt="    " className="Klik-nuage" />
          <img src={bordure} alt="Klik" className="Klik-bordure" />
          <img src={reuseImg} alt="Klik" className="Klik-reuse" />
        </div>
        <div className="Form-1">
          <h4>Bordure</h4>
          <Form>
            <div key={`default-"radio"`} className="mb-2">
              <Form.Check
                type="radio"
                id="radio"
                label="Droite"
                value="carré"
                checked={border === "carré"}
                onChange={handleBorder}
              />
              <Form.Check
                type="radio"
                id="radio"
                label="Ronde"
                value="rond"
                checked={border === "rond"}
                onChange={handleBorder2}
              />
            </div>
          </Form>
        </div>
        <div className="Form-2">
          <h4>Nuage</h4>
          <Form>
            <div key={`default-"radio"`} className="mb-2">
              <Form.Check
                type="radio"
                id="radio2"
                label="Avec"
                value="nuage"
                checked={footertext === "nuage"}
                onChange={handleFooter}
              />
              <Form.Check
                type="radio"
                id="radio2"
                label="Sans"
                value="null"
                checked={footertext === "null"}
                onChange={handleFooter2}
              />
            </div>
          </Form>
        </div>
        <div className="Form-5">
          <h4>Trame</h4>
          <Form>
            <div key={`default-"radio"`} className="mb-2">
              <Form.Check
                type="radio"
                id="radio"
                label="Blanche"
                value="Blanc"
                checked={colortext === "Blanc"}
                onChange={handleColor}
              />
              <Form.Check
                type="radio"
                id="radio"
                label="Noire"
                value="Noir"
                checked={colortext === "Noir"}
                onChange={handleColor2}
              />
            </div>
          </Form>
        </div>
        <Form className="client">
          <Form.Label className="mail">Votre Email</Form.Label>
          <input
            type="email"
            value={email}
            onChange={onEmailChange}
            placeholder="Entrez votre email"
          />
          <Form.Label className="phone">Votre Téléphone</Form.Label>
          <input
            type="tel"
            pattern="[0-9]{10}"
            value={phone}
            onChange={onPhoneChange}
            placeholder="Entrez votre numéro de téléphone"
          />
          <Form.Label className="boutique">Votre Enseigne</Form.Label>
          <input
            type="text"
            value={boutique}
            onChange={onBoutiqueChange}
            placeholder="Entrez votre Enseigne et votre ville"
          />
        </Form>
        <div className="Form-3">
          <h4>Votre Logo </h4>
          <Form>
            <div key={`default-"radio"`} className="mb-3">
              <Form.Check
                type="radio"
                id="radio3"
                label="Logo KliK"
                value="original"
                checked={logoK === "Klik-logo"}
                onChange={handleLogo}
              />
              <Form.Check
                type="radio"
                id="radio3"
                label="Votre logo"
                value="custom"
                checked={logoK === "Klik-logo-Custom"}
                onChange={handleLogo2}
              />
            </div>
          </Form>
          <form onSubmit={handleSubmit} className="form">
            <input type="file" />
            <button type="submit" className="customButton">
              Télécharger l'image
            </button>
          </form>

          {imageUrl.map((imageSrc) => (
            <img src={imageSrc} alt="" className="custom" />
          ))}

          {imgUrl && (
            <img src={imgUrl} alt=" " height={200} className="custom" />
          )}
          <button type="submit" className="clearButton" onClick={imageClear}>
            Supprimer l'image
          </button>
        </div>
        <div className="Form-4">
          <h4>Couleur de fond</h4>
          <div className="Form-4-1">
            <ChromePicker
              color={background}
              onChangeComplete={handleChangeComplete}
              className="colorpick"
            />
          </div>
        </div>
        <Form className="commentaire">
          <h4>Une Precision ?</h4>
          <textarea
            value={commentaire}
            onChange={onCommentChange}
            placeholder="Entrez votre commentaire"
          />
        </Form>
        <button className="valider" type="submit" onClick={sendEmail}>
          Validez votre design
        </button>
      </header>
    </div>
  );
}

export default Custom;
