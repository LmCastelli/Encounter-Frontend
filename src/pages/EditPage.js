import axios from "axios"
import { useNavigate, NavLink, useParams } from "react-router-dom"
import { useState, useEffect} from "react"
import "./EditPage.css"



function EditPage()  {
    const {id} = useParams();
    const navigate = useNavigate();
    const [entry, setEntry] = useState({})
    const [abilities, setAbilities] = useState([])
    const [newAbility, setNewAbility] = useState({user_id:id, ability_name:'', ability_description:''})
    const [error, setError] = useState(false)
    const [abilityError, setAbilityError] = useState(false)

    useEffect(() => {
        getEntry();
        getAbilities(id);
    }, [])

    const getEntry = () => {
        axios.get(`https://dnd-manager-backend.herokuapp.com/${id}/`)
        .then(res => {
            setEntry(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getAbilities = () => {
        axios.get(`https://dnd-manager-backend.herokuapp.com/${id}/abilities`)
        .then(res => {
            setAbilities(res.data,"abilities")
        })
        .catch(err => {
            console.log(err)
        })
    } 


    const handleChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        setEntry(values => ({...values, [field]: value}))
    }

    const handleAbilityChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        setNewAbility(values => ({...values, [field]: value}))
    }

    const handleNumberChange = (e) => {
        const field = e.target.name; 
        const value = e.target.value;
        setEntry(values => ({...values, [field]: Number(value)}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(entry.name === '' || entry.hit_points < 1 || entry.speed < 1 || entry.challenge_rating < 1 || entry.STR < 1 || entry.DEX < 1 || entry.CON < 1 || entry.INT < 1 || entry.WIS < 1 || entry.CHA < 1 ) {
            setError(true)
        } else {
            setError(false)
            console.log(entry, id)
            axios.put(`https://dnd-manager-backend.herokuapp.com/${id}/`, entry)
                .then(res => {
                    navigate('/view')
                })
        }
    }

    const handleAbilitySubmit = (e) => {
        if(newAbility.ability_name === '' || newAbility.ability_description === '') {
            e.preventDefault()
            setAbilityError(true)
        } else {
            setAbilityError(false)
            axios.post("https://dnd-manager-backend.herokuapp.com/abilities/", newAbility)
                .then(res => {
                    console.log("working")
                    console.log(res)
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }

    const handleAbilityDelete = (id) => {
        axios.delete(`https://dnd-manager-backend.herokuapp.com/abilities/${id}`)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err)
            })
    }

   

    return (
        <div className="EditPageContainer">
             <div className="NavBar">
                    <NavLink to="/" className="Link" >
                        <h1>Home</h1>
                    </NavLink>
                    <NavLink to="/view" className="Link" >
                        <h1>View All</h1>
                    </NavLink>
                    <NavLink to="/" className="Link" >
                        <h1>Encounter</h1>
                    </NavLink>
                </div>
            <div className="EditTitle">
                <h1>Editing {entry.name}...</h1>
            </div>
            <form className="Form" onSubmit={handleSubmit}>
            <div className="Required">
                <div className="GeneralDiv">
                    <h2 className="SubTitle">General</h2>
                    <label>Name:
                    <input 
                        type="text"
                        name="name"
                        value={entry.name}
                        onChange={handleChange}
                    />
                    </label>
                    <label className="General">Hit Points:
                    <input 
                        type="number"
                        name="hit_points"
                        value={entry.hit_points}
                        onChange={handleNumberChange}
                        className="TinyInput"
                    />
                    </label>
                    <label className="General">XP Rating:
                    <input 
                        type="number"
                        name="challenge_rating"
                        value={entry.challenge_rating}
                        onChange={handleNumberChange}
                        className="TinyInput"
                    />
                    </label>
                    <label className="General">Speed:
                    <input 
                        type="number"
                        name="speed"
                        value={entry.speed}
                        onChange={handleNumberChange}
                        className="TinyInput"
                    />
                    </label>
                </div>
                <div className="StatsDiv">
                <h2 className="SubTitle">Stats</h2>
                <label className="STAT">STR:
                <input 
                    type="number"
                    name="STR"
                    value={entry.STR}
                    onChange={handleNumberChange}
                    className="TinySTAT"
                />
                </label>
                <label className="STAT">DEX:
                <input 
                    type="number"
                    name="DEX"
                    value={entry.DEX}
                    onChange={handleNumberChange}
                    className="TinySTAT"
                />
                </label>
                <label className="STAT">CON:
                <input 
                    type="number"
                    name="CON"
                    value={entry.CON}
                    onChange={handleNumberChange}
                    className="TinySTAT"
                />
                </label>
                <label className="STAT">INT:
                <input 
                    type="number"
                    name="INT"
                    value={entry.INT}
                    onChange={handleNumberChange}
                    className="TinySTAT"
                />
                </label>
                <label className="STAT">WIS:
                <input 
                    type="number"
                    name="WIS"
                    value={entry.WIS}
                    onChange={handleNumberChange}
                    className="TinySTAT"
                />
                </label>
                <label className="STAT">CHA:
                <input 
                    type="number"
                    name="CHA"
                    value={entry.CHA}
                    onChange={handleNumberChange}
                    className="TinySTAT"
                />
                </label>
                {error === true ? <h3>Please fill fields</h3>:null }
                </div>
            </div>
            <div className="Extra">
                <h1 className="AddTitle">Additional Fields</h1>
                <div className="ExtraAttributes">
                    <h2>General</h2>
                    <label>Size:
                    <input 
                        type="text"
                        name="size"
                        value={entry.size}
                        placeholder="medium"
                        onChange={handleChange}
                    />
                    </label>
                    <label>Type:
                    <input 
                        type="text"
                        name="type"
                        value={entry.type}
                        onChange={handleChange}
                    />
                    </label>
                    <label>Alignment:
                    <input 
                        type="text"
                        name="alignment"
                        value={entry.alignment}
                        placeholder="neutral"
                        onChange={handleChange}
                    />
                    </label>
                    <label>Armor Type:
                    <input 
                        type="text"
                        name="armor_type"
                        value={entry.armor_type}
                        placeholder='Light Armor'
                        onChange={handleChange}
                    />
                    </label>
                    <label>Natural Armor Bonus:
                    <input 
                        type="number"
                        name="nat_armor_bonus"
                        value={entry.nat_armor_bonus}
                        onChange={handleNumberChange}
                        className="TinyField"
                    />
                    </label>
                </div>
                <h2>Movement</h2>
                <div className="ExtraAttributes">
                    <label>Burrow Speed:
                    <input 
                        type="number"
                        name="burrow_speed"
                        value={entry.burrow_speed}
                        onChange={handleNumberChange}
                        className="TinyField"
                    />
                    </label>
                    <label>Climb Speed:
                    <input 
                        type="number"
                        name="climb_speed"
                        value={entry.climb_speed}
                        onChange={handleNumberChange}
                        className="TinyField"
                    />
                    </label>
                    <label>Fly Speed:
                    <input 
                        type="number"
                        name="fly_speed"
                        value={entry.fly_speed}
                        onChange={handleChange}
                        className="TinyField"
                    />
                    </label>
                    <label>Swim Speed:
                    <input 
                        type="number"
                        name="swim_speed"
                        value={entry.swim_speed}
                        onChange={handleNumberChange}
                        className="TinyField"
                    />
                    </label>
                </div>
                <h2>Saving Throws and Skills</h2>
                <div className="ExtraAttributes">
                    <label>Saving Throws:
                    <input 
                        type="text"
                        name="saving_throws"
                        value={entry.saving_throws}
                        placeholder="none"
                        onChange={handleChange}
                        className="BigField"
                    />
                    </label>
                    <label>Proficient Skills:
                    <input 
                        type="text"
                        name="proficient_skills"
                        value={entry.proficient_skills}
                        placeholder="none"
                        onChange={handleChange}
                        className="BigField"
                    />
                    </label>
                    <label>Expert Skills:
                    <input 
                        type="text"
                        name="expert_skills"
                        value={entry.expert_skills}
                        placeholder="none"
                        onChange={handleChange}
                        className="BigField"
                    />
                    </label>
                </div>
                <h2>Immunities and Damage Modifiers</h2>
                <div className="ExtraAttributes">
                    <label>Immune To:
                    <input 
                        type="text"
                        name="immunities"
                        value={entry.immunities}
                        onChange={handleChange}
                        className="BigField"
                    />
                    </label>
                    <label>Vulnerabilities:
                    <input 
                        type="text"
                        name="damage_vulnerabilities"
                        value={entry.damage_vulnerable}
                        onChange={handleChange}
                        className="BigField"
                    />
                    </label>
                    <label>Dmg Resistant:
                    <input 
                        type="text"
                        name="damage_resistant"
                        value={entry.damage_resistant}
                        onChange={handleChange}
                        className="BigField"
                    />
                    </label>
                    <label>Dmg Immune:
                    <input 
                        type="text"
                        name="damage_immune"
                        value={entry.damage_immune}
                        onChange={handleChange}
                        className="BigField"
                    />
                    </label>
                </div>
                <h2>Languages</h2>
                <div className="ExtraAttributes">
                    <label>Languages Spoken:
                    <input 
                        type="text"
                        name="languages_spoken"
                        value={entry.languages_spoken}
                        onChange={handleChange}
                        className="MedField"
                    />
                    </label>
                    <label>Languages Understood:
                    <input 
                        type="text"
                        name="languages_understood"
                        value={entry.languages_understood}
                        onChange={handleChange}
                        className="MedField"
                    />
                    </label>
                    <label>Telepathy:
                    <input 
                        type="number"
                        name="telepathy"
                        value={entry.telepathy}
                        onChange={handleNumberChange}
                        className="TinyField"
                    />
                    </label>
                </div>
                <h2>Vision/Detection</h2>
                <div className="ExtraAttributes">
                    <label>Blind Sight:
                    <input 
                        type="number"
                        name="blind_sight"
                        value={entry.blind_sight}
                        onChange={handleNumberChange}
                        className="TinyField"
                    />
                    </label>
                    <label>Dark Vision:
                    <input 
                        type="number"
                        name="dark_vision"
                        value={entry.dark_vision}
                        onChange={handleNumberChange}
                        className="TinyField"
                    />
                    </label>
                    <label>Tremor Sense:
                    <input 
                        type="number"
                        name="tremor_sense"
                        value={entry.tremor_sense}
                        onChange={handleNumberChange}
                        className="TinyField"
                    />
                    </label>
                    <label>True Sight:
                    <input 
                        type="number"
                        name="true_sight"
                        value={entry.true_sight}
                        onChange={handleNumberChange}
                        className="TinyField"
                    />
                    </label>
                </div>
            </div>
            <button type="submit">Add It!</button>
            </form>
            {abilities.length !== 0 ?
            <div className="AbilityContainer">
                <h2 className="AbilityTitle">Abilities:</h2>
                {abilities.map((ability) => (
                    <div key={ability.ability_id} className="Abilities">
                        <h4 className="AbilityName">{ability.ability_name}:</h4>
                        <p className="AbilityDescription">{ability.ability_description}</p>
                        <button className="AbilityButton" onClick={() => handleAbilityDelete(ability.ability_id)}>Delete</button>
                    </div>
                ))}
            </div>:
            <h4>No Abilities Currently</h4>}
            <form className="AbilityForm" onSubmit={handleAbilitySubmit}>
                <label className="AbilityNameEntry">Ability Name:
                <input 
                    type="text"
                    name="ability_name"
                    value={newAbility.ability_name}
                    onChange={handleAbilityChange}
                />
                </label>
                <label className="AbilityDescriptionEntry">Ability Description:
                <textarea 
                    name="ability_description"
                    value={newAbility.ability_description}
                    onChange={handleAbilityChange}
                    className="AbilityField"
                />
                </label>
                <button>Add Ability</button>
            </form>
            {abilityError === true ? <h3>Please fill both fields in</h3>: null}
        </div>
    )
}

export default EditPage;