import React from 'react';
import './App.css';

export class PrintCv extends React.Component {
    render() {
        return (

            <div id="primaryContainer">
                <div id="leftBox">
                    <img src="./img/emk.jpg" alt="personal" id="personalImg" />
                    <h2>Enzo Matthias Kublin</h2>
                    <p>Full Stack Web Developer</p>
                    <p>Projektmanager &#40;Level D&#41; - IPMA/ GPM</p>
                    <p>EU-Fundraiser</p>
                    <div id="addressBox">
                        <h3>KONTAKT</h3>
                        <ul className="leftBoxUl">
                            <li>
                                <ul className="leftBoxUl2">
                                    <li className="leftBoxLi">Adresse:</li>
                                    <li className="leftBoxLi">Büxensteinallee 15, 12527 Berlin</li>
                                </ul>
                            </li>
                            <li>
                                <ul className="leftBoxUl2">
                                    <li className="leftBoxLi">Tel.:</li>
                                    <li className="leftBoxLi">+49 176 8474 1617</li>
                                </ul>
                            </li>
                            <li>
                                <ul className="leftBoxUl2">
                                    <li className="leftBoxLi">&#64;</li>
                                    <li className="leftBoxLi">enzokublin@gmail.com</li>
                                </ul>
                            </li>
                            <li>
                                <ul className="leftBoxUl2">
                                    <li className="leftBoxLi"><img src="./img/github-logo.svg" alt="LinkedIn" id="gitHubLogo" /></li>
                                    <li className="leftBoxLi"><a href="https://github.com/enzokublin" className="leftBoxLiA">GitHub/enzokublin</a></li>
                                </ul>
                            </li>
                            <li>
                                <ul className="leftBoxUl2">
                                    <li className="leftBoxLi"><img src="./img/linkedIn-logo.svg" alt="LinkedIn" id="linkedInLogo" /></li>
                                    <li className="leftBoxLi"> <a href="https://www.linkedin.com/in/enzo-kublin/" className="leftBoxLiA">LinkedIn/enzokublin</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div id="languageBox">
                        <h3>SPRACHKENNTNISSE</h3>
                        <ul className="leftBoxUl">
                            <li>
                                <ul className="leftBoxUl2">
                                    <li className="leftBoxLi">Deutsch:</li>
                                    <li className="leftBoxLi">Muttersprache</li>
                                </ul>
                            </li>
                            <li>
                                <ul className="leftBoxUl2">
                                    <li className="leftBoxLi">Englisch:</li>
                                    <li className="leftBoxLi">Fließend</li>
                                </ul>
                            </li>
                            <li>
                                <ul className="leftBoxUl2">
                                    <li className="leftBoxLi">Estnisch:</li>
                                    <li className="leftBoxLi">Gute Sprachkenntnisse</li>
                                </ul>
                            </li>
                            <li>
                                <ul className="leftBoxUl2">
                                    <li className="leftBoxLi">Französisch:</li>
                                    <li className="leftBoxLi">Grundkenntnisse</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <div id="rightBox">
                    <div id="profilBox">
                        <h3>PERSÖNLICHES PROFIL</h3>
                        <p>Ich bin ein Full Stack Web Developer aus Berlin mit einem Hintergrund in Politik- und Verwaltungswissenschaft. Bevor ich meine Leidenschaft fürs Programmieren entdeckte, arbeitete ich als Social Media Manager, Berater für EU-Projekte und E-Learning Trainer für EU-Fundraising. Ich interessiere mich für Full Stack Web Developer Stellen, die mir ermöglichen in einem Team von motivierten Menschen an Projekten zuarbeiten.</p>
                    </div>
                    <div id="portfolioBox">
                        <h3>PORTFOLIO</h3>
                        <ul id="portfolioUl">
                            <li className="portfolioIL">Das Spiel „Vier Gewinnt” habe ich mit JQuery, CSS und Html nachgebaut.</li>
                            <li className="portfolioIL">Unter Verwendung des Node.js Frameworks Express.js &#40;Handlebars&#41; schuf ich eine Petitionsseite.</li>
                            <li className="portfolioIL">Mittels Vue.js und der Open-Source Datenbank PostgreSQL entwickelte ich ein Imageboard.</li>
                            <li className="portfolioIL">Drei Wochen lang arbeitete ich an meinem Social Network, für das ich die JavaScript Frameworks React, Redux und die Echtzeitanwendung Socket.io verwendete.</li>
                            <li className="portfolioIL">Mit JQuery, CSS Flexbox, Animate.css und Font Awesome entwickelte ich das Spiel „Abalone“.</li>
                        </ul>
                    </div>
                    <div id="workExperienceBox">
                        <h3>BERUFLICHER WERDEGANG</h3>
                        <div id="eufrak">
                            <h4 className="job">E-Learning Trainer &frasl; Consultant für EU-Fundraising &#124; Projektmangement &amp; Social Media Manager</h4>
                            <p className="company">Europäische Fundraising Akademie - EuroConsults GmbH</p>
                            <p className="company">Berlin, Deutschland &#124; November 2014 - November 2017</p>
                            <ul className="jobUl">
                                <li className="tasks">Unterstützung und Schulung der Kursteilnehmer sowie die Erstellung neuer und die Aktualisierung bestehender E-Learning Module.</li>
                                <li className="tasks">Betreuung der Facebook, LinkedIn, Xing und Twitter Accounts sowie des Newsletters.</li>
                                <li className="tasks">Erstellung von Factsheets zu EU-Förderprogrammen &#40; z.B. Erasmus + &#41; und eines umfassenden Kompendiums über das INTERREG V Programm </li>
                                <li className="tasks">Projektberatung &#40;EU-Förderung und Projektmanagement &#41;</li>
                            </ul>
                        </div>
                        <div id="wenningServices">
                            <h4 className="job">Desk &amp; Research Assistant</h4>
                            <p className="company">Wenning Services Politikberatung Berlin &#124; Brüssel</p>
                            <p className="company">Berlin, Deutschland &#124; September 2012 - September 2013</p>
                            <ul className="jobUl">
                                <li className="tasks">Auswahl und Aufbereitung kundenrelevanter Informationen zu bestimmten Politikfeldern und Gesetzgebungsprozessen auf nationaler und europäischer Ebene.</li>
                                <li className="tasks">Aufbau einer 2000 Kontakte umfassenden Adressdatenbank für einen Kunden.</li>
                                <li className="tasks">Administrative Leitung des Berliner Standorts, inklusive Kommunikation mit Kunden und dem politischen Betrieb.</li>
                                <li className="tasks">Klassische Rechercheaufgaben, wie das Beschaffen eines internen Dokuments zu einerBundesratsinitiative vor dessen Veröffentlichung.</li>
                                <li className="tasks">Hintergrundrecherche und Aufbereitung des täglich erscheinenden Newsletters.</li>
                            </ul>
                        </div>
                        <div id="greens">
                            <h4 className="job">Wahlkampfhelfer im Bundestagswahlkampf 2013</h4>
                            <p className="company">Kreisverband Freiburg Bündnis 90 &frasl; Die Grünen</p>
                            <p className="company">Freiburg im Breisgau, Deutschland &#124; Juni 2013 - September 2013</p>
                            <ul className="jobUl">
                                <li className="tasks">Mitarbeit an Wahlkampfständen, Vorbereitung und Durchführung von Wahlveranstaltungen, typische Wahlkampftätigkeiten wie Plakatieren.</li>
                                <li className="tasks">Planung &amp; Durchführung von 1-Tages-Wahlkampfworkshop in Freiburg i.Br..</li>
                                <li className="tasks">Organisatorisch Begleitung verschiedener Wahlkampfauftritte grüner Spitzenpolitiker u.a. von Katrin Göring-Eckardt und Jürgen Trittin.</li>
                                <li className="tasks">Organisation zweier Veranstaltungen des Programms „Grün Unterwegs“.</li>
                                <li className="tasks">Auswahl, Einladung und Recherche von Hintergrundinformationen zu den Referenten sowie Aufbereitung dieser Infos für die Programmbroschüre.</li>
                            </ul>
                        </div>
                    </div>
                    <div id="education">
                        <h3>BILDUNG</h3>
                        <ul className="educationUl">
                            <li className="educationLi">SPICED Academy in Berlin, Deutschland</li>
                            <li className="educationLi">Full Stack Web Developer &#124; Abschluss: November 2018</li>
                        </ul>
                        <ul className="educationUl">
                            <li className="educationLi">Business Trends Academy in Berlin, Deutschland</li>
                            <li className="educationLi">Projektmanager &#40;Level D&#41; &ndash; IPMA &frasl;  GPM &#124; Abschluss: Mai 2018</li>
                        </ul>
                        <ul className="educationUl">
                            <li className="educationLi">Europäische Fundraising Akademie in Berlin, Deutschland</li>
                            <li className="educationLi">EU-Fundraiser &amp; Projektmanager &#124; Abschluss: Januar 2015</li>
                        </ul>
                        <ul className="educationUl">
                            <li className="educationLi">Agentur Alfatraining in Freiburg im Breisgau, Deutschland</li>
                            <li className="educationLi">Mediengestaltung &#40;Adobe Photoshop, Illustrator, InDesign &amp; Adobe Acrobat X Professional&#41; und Webdesign &#40;CMS-TYPO3&#41; &#124; Abschluss: Juni 2014</li>
                        </ul>
                        <ul className="educationUl">
                            <li className="educationLi">EuroCollege &ndash; Tartu Universität in Tartu, Estland</li>
                            <li className="educationLi">Master of Arts in EU-Russland Studien &#124; Abschluss: Juni 2011</li>
                        </ul>
                        <ul className="educationUl">
                            <li className="educationLi">Konstanz Universität in Konstanz, Deutschland</li>
                            <li className="educationLi">Bachelor of Arts in Politik &ndash; &amp; Verwaltungswissenschaft &#124; Abschluss: April 2009</li>
                        </ul>
                    </div>
                    <div id="hobbys">
                        <h3>INTERESSEN &amp; HOBBYS</h3>
                        <div className="ngoBox">
                            <h4 className="job">Ostblick e.V. in Berlin, Deutschland</h4>
                            <ul className="ngoBoxUl">
                                <li className="ngoBoxLi">Mitglied des Vorstands seit 2015 &#124; 2.Vorsitzender seit 2017</li>
                                <li className="ngoBoxLi">Organisation von Ostblickabenden &amp; Akquirierung von Referenten&#42;innen</li>
                                <li className="ngoBoxLi">Betreuung von studentischen Projektgruppen des Osteuropastudiengangs von der Freien Universität Berlin</li>
                            </ul>
                        </div>
                        <div className="ngoBox">
                            <h4 className="job">One Europe e.V in Nürnberg, Deutschland</h4>
                            <ul className="ngoBoxUl">
                                <li className="ngoBoxLi">Mitglied seit März 2019  &#124; Stellv. Vorsitzender seit April 2019</li>
                                <li className="ngoBoxLi">Ansprechpartner für Berlin</li>
                                <li className="ngoBoxLi">Vertretung von One Europe auf der Networking Conference &quot; Civil Society 4.0&quot; in Berlin 2019</li>
                            </ul>
                        </div>
                        <div className="ngoBox">
                            <h4 className="job">Europa-Union Deutschland Kreisverband Freiburg</h4>
                            <ul className="ngoBoxUl">
                                <li className="ngoBoxLi">Mitglied des Vorstands von 2012 bis 2014</li>
                                <li className="ngoBoxLi">Organisation von Veranstaltungen</li>
                                <li className="ngoBoxLi">Vertretung des Kreisverbandes in Gremien der Europa-Union Deutschland &#45; Landesverband Baden&#45;Württemberg</li>
                            </ul>
                        </div>
                        <div className="ngoBox">
                            <h4 className="job">Junge Europäer &#45; JEF Baden&#45;Württemberg</h4>
                            <ul className="ngoBoxUl">
                                <li className="ngoBoxLi">Mitglied des Landesverbandvorstands von 2001 bis 2005</li>
                                <li className="ngoBoxLi">Mitbegründer und Vorsitzender der Jungen Europäer &#45; JEF Freiburg von 2002 bis 2004.</li>
                                <li className="ngoBoxLi">Vertretung des Kreis&#45; und Landesverbandes in Gremien der Jungen Europäischen Föderalisten &#40;JEF &#41; Deutschland</li>
                            </ul>
                        </div>
                        <div className="ngoBox">
                            <ul className="ngoBoxUl2">
                                <li className="ngoBoxLi2"> Mitglied von Bündnis 90 / Die Grünen &#45; Seit März 2001</li>
                                <li className="ngoBoxLi2"> Mitglied des Bundes für Umwelt und Naturschutz Deutschlands &#40;BUND &#41; <br /> &#45; Seit März 2001</li>
                                <li className="ngoBoxLi2"> Mitglied der Gesellschaft zur Förderung der grenzüberschreitenden Zusammenarbeit &#40;GFGZ &#41; &#45; Seit Mai 2017</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}