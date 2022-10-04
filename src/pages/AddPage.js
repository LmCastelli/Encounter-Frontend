import "./AddPage.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {useState} from "react"

// NavLink to 'Home' 'View'
// OnSubmit forward to view or edit?
function AddPage() {


    const [entry, setEntry] = useState({
        name: '',
        hit_points: 0,
        speed: 0,
        challenge_rating: 0,
        STR: 0,
        DEX: 0,
        CON: 0,
        INT: 0,
        WIS: 0,
        CHA: 0,
        size: 'Medium',
        type: '',
        alignment: 'Neutral',
        armor_type: '',
        nat_armor_bonus: 0,
        burrow_speed: 0,
        climb_speed: 0,
        fly_speed: 0,
        swim_speed: 0,
        saving_throws: '',
        proficient_skills: '',
        expert_skills: '', 
        immunities: '', 
        damage_vulnerable: '', 
        damage_resistant: '',
        damage_immune: '',
        languages_spoken: '', 
        languages_understood: '', 
        telepathy: 0, 
        blind_sight: 0,
        dark_vision: 0, 
        tremor_sense: 0, 
        true_sight: 0,
    })

    const navigate = useNavigate();
    const [error, setError] = useState(false)

    const handleChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        setEntry(values => ({...values, [field]: value}))
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
        }else {
            setError(false)
            axios.post('https://dnd-manager-backend.herokuapp.com', entry)
                .then(res => {
                    navigate('/')
                })
                .catch(err => {
                    console.log(err)
                    console.log('catch from addpage')
                })
                
        }
        
    }


    return (
        <div className="AddPageContainer">
            <h1>Add Page</h1>
            <form onSubmit={handleSubmit}>
            <div className="Required">
                <h1>Required Fields</h1>
                <h2>General</h2>
                <label>Name:
                <input 
                    type="text"
                    name="name"
                    value={entry.name}
                    onChange={handleChange}
                />
                </label>
                <label>Hit Points:
                <input 
                    type="number"
                    name="hit_points"
                    value={entry.hit_points}
                    onChange={handleNumberChange}
                />
                </label>
                <label>Speed:
                <input 
                    type="number"
                    name="speed"
                    value={entry.speed}
                    onChange={handleNumberChange}
                />
                </label>
                <label>Challenge Rating:
                <input 
                    type="number"
                    name="challenge_rating"
                    value={entry.challenge_rating}
                    onChange={handleNumberChange}
                />
                </label>
                <h2>Stats</h2>
                <label>STR:
                <input 
                    type="number"
                    name="STR"
                    value={entry.STR}
                    onChange={handleNumberChange}
                />
                </label>
                <label>DEX:
                <input 
                    type="number"
                    name="DEX"
                    value={entry.DEX}
                    onChange={handleNumberChange}
                />
                </label>
                <label>CON:
                <input 
                    type="number"
                    name="CON"
                    value={entry.CON}
                    onChange={handleNumberChange}
                />
                </label>
                <label>INT:
                <input 
                    type="number"
                    name="INT"
                    value={entry.INT}
                    onChange={handleNumberChange}
                />
                </label>
                <label>WIS:
                <input 
                    type="number"
                    name="WIS"
                    value={entry.WIS}
                    onChange={handleNumberChange}
                />
                </label>
                <label>CHA:
                <input 
                    type="number"
                    name="CHA"
                    value={entry.CHA}
                    onChange={handleNumberChange}
                />
                </label>
                {error === true ? <h3>Please fill fields</h3>:null }
            </div>
            <div className="Extra">
                <h1>Additional Fields</h1>
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
                />
                </label>
                <h2>Movement</h2>
                <label>Burrow Speed:
                <input 
                    type="number"
                    name="burrow_speed"
                    value={entry.burrow_speed}
                    onChange={handleNumberChange}
                />
                </label>
                <label>Climb Speed:
                <input 
                    type="number"
                    name="climb_speed"
                    value={entry.climb_speed}
                    onChange={handleNumberChange}
                />
                </label>
                <label>Fly Speed:
                <input 
                    type="number"
                    name="fly_speed"
                    value={entry.fly_speed}
                    onChange={handleChange}
                />
                </label>
                <label>Swim Speed:
                <input 
                    type="number"
                    name="swim_speed"
                    value={entry.swim_speed}
                    onChange={handleNumberChange}
                />
                </label>
                <h2>Saving Throws and Skills</h2>
                <label>Saving Throws:
                <input 
                    type="text"
                    name="saving_throws"
                    value={entry.saving_throws}
                    placeholder="none"
                    onChange={handleChange}
                />
                </label>
                <label>Proficient Skills:
                <input 
                    type="text"
                    name="proficient_skills"
                    value={entry.proficient_skills}
                    placeholder="none"
                    onChange={handleChange}
                />
                </label>
                <label>Expert Skills:
                <input 
                    type="text"
                    name="expert_skills"
                    value={entry.expert_skills}
                    placeholder="none"
                    onChange={handleChange}
                />
                </label>
                <h2>Immunities and Damage Modifiers</h2>
                <label>Immunities:
                <input 
                    type="text"
                    name="immunities"
                    value={entry.immunities}
                    onChange={handleChange}
                />
                </label>
                <label>Damage Vulnerabilities:
                <input 
                    type="text"
                    name="damage_vulnerabilities"
                    value={entry.damage_vulnerable}
                    onChange={handleChange}
                />
                </label>
                <label>Damage Resistant:
                <input 
                    type="text"
                    name="damage_resistant"
                    value={entry.damage_resistant}
                    onChange={handleChange}
                />
                </label>
                <label>Damage Immune:
                <input 
                    type="text"
                    name="damage_immune"
                    value={entry.damage_immune}
                    onChange={handleChange}
                />
                </label>
                <h2>Languages</h2>
                <label>Languages Spoken:
                <input 
                    type="text"
                    name="languages_spoken"
                    value={entry.languages_spoken}
                    onChange={handleChange}
                />
                </label>
                <label>Languages Understood:
                <input 
                    type="text"
                    name="languages_understood"
                    value={entry.languages_understood}
                    onChange={handleChange}
                />
                </label>
                <label>Telepathy:
                <input 
                    type="number"
                    name="telepathy"
                    value={entry.telepathy}
                    onChange={handleNumberChange}
                />
                </label>
                <h2>Vision/Detection</h2>
                <label>Blind Sight:
                <input 
                    type="number"
                    name="blind_sight"
                    value={entry.blind_sight}
                    onChange={handleNumberChange}
                />
                </label>
                <label>Dark Vision:
                <input 
                    type="number"
                    name="dark_vision"
                    value={entry.dark_vision}
                    onChange={handleNumberChange}
                />
                </label>
                <label>Tremor Sense:
                <input 
                    type="number"
                    name="tremor_sense"
                    value={entry.tremor_sense}
                    onChange={handleNumberChange}
                />
                </label>
                <label>True Sight:
                <input 
                    type="number"
                    name="true_sight"
                    value={entry.true_sight}
                    onChange={handleNumberChange}
                />
                </label>
            </div>
            <button type="submit">Add It!</button>
            </form>
        </div>
    )
}

export default AddPage;