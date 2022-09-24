import book from "../monsterbook.png"
import swords from "../swords.png"
import "./LandingPage.css"

import {NavLink} from "react-router-dom"

function LandingPage()  {

    return (
        <div className="LandingContainer">
            <div className="Middle">
                <div className="TopHalf">
                    <div className="MonsterInfo">
                        <div className="Border"></div>
                        <NavLink to="/view" className="Link">
                            <h1 className="h1Link">View Monsters</h1>
                        </NavLink>
                        <NavLink to="/add" className="Link">
                            <h1 className="h1Link">Add Monster</h1>
                        </NavLink>
                        <div className="BottomBorder"></div>
                    </div>
                    <div className="MonsterContainer">
                        <div className="Border"></div>
                        <img className="MonsterImg" src={book} alt="Monster Book"/>
                        <div className="BottomBorder"></div>
                    </div>
                </div>
                <div className="BottomHalf">
                    <div className="EncounterContainer">
                    <div className="Border"></div>
                        <img className="EncounterImg" src={swords} alt="Swords"/>
                        <div className="BottomBorder"></div>
                    </div>
                    <div className="EncounterInfo">
                        <div className="Border"></div>
                        <h1 className="h1Link">Load Encounter</h1>
                        <h1 className="h1Link">New Encounter</h1>
                        <div className="BottomBorder"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}   

export default LandingPage;