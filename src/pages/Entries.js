import axios from "axios";
import 'antd/dist/antd.min.css'
import { NavLink } from "react-router-dom";
import { Table } from "antd";
import { useEffect, useState} from "react";
import "./Entries.css"

function Entries () {
    document.body.style.backgroundColor = "#000000";
    const dummydata = [
        {
            "CHA": 20,
            "CON": 20,
            "DEX": 20,
            "INT": 20,
            "STR": 20,
            "WIS": 20,
            "alignment": "Good",
            "armor_type": "Chain Mail",
            "blind_sight": 0,
            "burrow_speed": 20,
            "challenge_rating": 10,
            "climb_speed": 20,
            "damage_immune": "Poison",
            "damage_resistant": "All",
            "damage_vulnerable": "",
            "dark_vision": 60,
            "dnd_id": 1,
            "expert_skills": "Stealth",
            "fly_speed": 40,
            "hit_points": 90,
            "immunities": "Blinded, Charmed, Invisible",
            "languages_spoken": "All",
            "languages_understood": "All",
            "name": "TEST",
            "nat_armor_bonus": 10,
            "proficient_skills": "History",
            "saving_throws": "",
            "size": "Medium",
            "speed": 20,
            "swim_speed": 20,
            "telepathy": 60,
            "tremor_sense": 0,
            "true_sight": 30,
            "type": "Humanoid"
        },
        {
            "CHA": 2,
            "CON": 2,
            "DEX": 2,
            "INT": 2,
            "STR": 2,
            "WIS": 2,
            "alignment": "Bad",
            "armor_type": "Nothing",
            "blind_sight": 0,
            "burrow_speed": 0,
            "challenge_rating": 1,
            "climb_speed": 0,
            "damage_immune": "Poison",
            "damage_resistant": "",
            "damage_vulnerable": "",
            "dark_vision": 0,
            "dnd_id": 2,
            "expert_skills": "Archery",
            "fly_speed": 0,
            "hit_points": 0,
            "immunities": "Charmed, Invisible",
            "languages_spoken": "",
            "languages_understood": "All",
            "name": "TEST TWO",
            "nat_armor_bonus": 10,
            "proficient_skills": "History",
            "saving_throws": "",
            "size": "Medium",
            "speed": 20,
            "swim_speed": 20,
            "telepathy": 60,
            "tremor_sense": 0,
            "true_sight": 30,
            "type": "Humanoid"
        },
            
    ]

    const dummyabilities = [
        {
            "ability_id":1,
            "user_id":1,
            "ability_name":"Death",
            "ability_description":"Kill target",
        },
        {
            "ability_id":2,
            "user_id":1,
            "ability_name":"Life",
            "ability_description":"Heal target for all its hit points and replenish all spell slots",
        }
    ]

    const [selected, setSelected] = useState(dummydata[0])
    const [selectedAbilities, setSelectedAbilities] = useState(dummyabilities)
    const [data, setData] = useState(dummydata)

    const abilityModifier = (score) => {
        let mod = Math.floor((score-10) / 2);
        if(mod > 0) {
            return `+${mod}`
        } else {
            return `${mod}`
        }
    };

    const handleClick = (record, id) => {
        setSelected(record);
        getAbilities(id);
    }

    const getEntries = () => {
        axios.get('https://dnd-manager-backend.herokuapp.com')
        .then(res => {
            console.log(res, res.data)
            setData(res.data)
            setSelected(res.data[0])
        })
        .catch(err => {
            console.error(err);
        })
    }

    const getAbilities = (id) => {
        axios.get(`https://dnd-manager-backend.herokuapp.com/${id}/abilities`)
        .then(res => {
            console.log(res.data)
            setSelectedAbilities(res.data)
        })
        .catch(err => {
            console.error(err)
            setSelectedAbilities({})
            console.log(selectedAbilities)
        })
    }
    
    useEffect(() => {
        getEntries();
    }, [])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            defaultSortOrder: 'descend',
            sorter: (a,b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Id',
            dataIndex: 'dnd_id',
            defaultSortOrder: 'descend',
            sorter: (a,b) => a.dnd_id - b.dnd_id,
        },
        {
            title: 'Challenge Rating',
            dataIndex: 'challenge_rating',
            defaultSortOrder: 'descend',
            sorter: (a,b) => a.challenge_rating - b.challenge_rating,
        },
    ];


    return (
        <div className="EntriesContainer">
            <div className="AllEntriesContainer">
                <div className="NavBar">
                    <NavLink to="/" className="Link" >
                        <h1>Home</h1>
                    </NavLink>
                    <NavLink to="/add" className="Link" >
                        <h1>Add</h1>
                    </NavLink>
                    <NavLink to="/" className="Link" >
                        <h1>Encounter</h1>
                    </NavLink>
                </div>
                <div className="ListContainer">
                    <Table columns={columns} dataSource={data} rowKey={"dnd_id"} onRow={(record) => ({onClick: () => {handleClick(record, record.dnd_id)}})} />
                </div>
            </div>
            <div className="SelectedContainer">
                <div className="Border"></div>
                <div className="Info">
                    <div className="NameAndEdit">
                        <h1 className="Title">{selected.name}</h1>
                        <NavLink className="Edit" to={`/edit/${selected.dnd_id}`} ><button>EDIT</button> </NavLink>
                    </div>
                    <p className="Description">{selected.size} {selected.type.toLowerCase()}, {selected.alignment}</p>
                    <svg height="5" width="100%" className="DividingLine">
                        <polyline points="0,0 400, 2.5 0,5"></polyline>
                    </svg>
                    <div className="TextField">
                        <h4>Hit Points:</h4>
                        <p>{selected.hit_points}</p>
                    </div>
                    <div className="TextField">
                        <h4>Armor Class:</h4>
                        <p>{selected.armor_type} ({selected.nat_armor_bonus})</p>
                    </div>
                    <div className="TextField">
                        <h4>Speed: </h4>
                        <p>{selected.speed} </p>
                    </div>
                    <div className="TextField">
                        <h4>Challenge Rating: </h4>
                        <p>{selected.challenge_rating}</p>
                    </div>

                    {selected.burrow_speed > 0 ? 
                    <div className="TextField">
                        <h4>Burrow Speed: </h4>
                        <p>{selected.burrow_speed}</p>
                    </div>:null}

                    {selected.climb_speed > 0 ? 
                    <div className="TextField">
                        <h4>Climb Speed: </h4>
                        <p>{selected.climb_speed}</p>
                    </div>:null}
                    
                    {selected.fly_speed > 0 ? 
                    <div className="TextField">
                        <h4>Fly Speed: </h4>
                        <p>{selected.fly_speed}</p>
                    </div>:null}

                    {selected.swim_speed > 0 ? 
                    <div className="TextField">
                        <h4>Swim Speed: </h4>
                        <p>{selected.swim_speed}</p>
                    </div>:null}

                    {selected.saving_throws !== "" ? 
                    <div className="TextField">
                        <h4>Saving Throws: </h4>
                        <p>{selected.saving_throws}</p>
                    </div>:null}

                    <svg height="5" width="100%" className="DividingLine">
                        <polyline points="0,0 400, 2.5 0,5"></polyline>
                    </svg>

                    <div className="AbilityScores">
                        <div className="StatContainer">
                            <h3>STR</h3>
                            <p>{selected.STR}({abilityModifier(selected.STR)})</p>
                        </div>
                        <div className="StatContainer">
                            <h3>DEX</h3>
                            <p>{selected.DEX}({abilityModifier(selected.DEX)})</p>
                        </div>
                        <div className="StatContainer">
                            <h3>CON</h3>
                            <p>{selected.CON}({abilityModifier(selected.CON)})</p>
                        </div>
                        <div className="StatContainer">
                            <h3>INT</h3>
                            <p>{selected.INT}({abilityModifier(selected.INT)})</p>
                        </div>
                        <div className="StatContainer">
                            <h3>WIS</h3>
                            <p>{selected.WIS}({abilityModifier(selected.WIS)})</p>
                        </div>
                        <div className="StatContainer">
                            <h3>CHA</h3>
                            <p>{selected.CHA}({abilityModifier(selected.CHA)})</p>
                        </div>
                    </div>

                    <svg height="5" width="100%" className="DividingLine">
                        <polyline points="0,0 400, 2.5 0,5"></polyline>
                    </svg>

                    {selected.expert_skills !== "" ?
                    <div className="TextField">
                        <h4>Expert Skills: </h4>
                        <p>{selected.expert_skills}</p>
                    </div>:null}

                    {selected.proficient_skills !== "" ?
                    <div className="TextField">
                        <h4>Proficient Skills: </h4>
                        <p>{selected.proficient_skills}</p>
                    </div>:null}

                    {selected.languages_spoken !== "" ?
                    <div className="TextField">
                        <h4>Languages Spoken: </h4>
                        <p>{selected.languages_spoken}</p>
                    </div>:null}

                    {selected.languages_understood !== "" ?
                    <div className="TextField">
                        <h4>Languages Understood: </h4>
                        <p>{selected.languages_understood}</p>
                    </div>:null}

                    {selected.damage_immune !== "" ?
                    <div className="TextField">
                        <h4>Damage Immunities: </h4>
                        <p>{selected.damage_immune}</p>
                    </div>:null}

                    {selected.damage_resistant !== "" ?
                    <div className="TextField">
                        <h4>Damage Resistances: </h4>
                        <p>{selected.damage_resistant}</p>
                    </div>:null}

                    {selected.damage_vulnerable !== "" ?
                    <div className="TextField">
                        <h4>Damage Vulnerabilities: </h4>
                        <p>{selected.damage_vulnerable}</p>
                    </div>:null}

                    {selected.immunities !== "" ?
                    <div className="TextField">
                        <h4>Immune to: </h4>
                        <p>{selected.immunities}</p>
                    </div>:null}

                    {selected.blind_sight > 0 ? 
                    <div className="TextField">
                        <h4>Blind Sight: </h4>
                        <p>{selected.blind_sight}</p>
                    </div>:null}

                    {selected.dark_vision > 0 ? 
                    <div className="TextField">
                        <h4>Dark Vision: </h4>
                        <p>{selected.dark_vision}</p>
                    </div>:null}

                    {selected.true_sight > 0 ? 
                    <div className="TextField">
                        <h4>True Sight: </h4>
                        <p>{selected.true_sight}</p>
                    </div>:null}

                    {selected.tremor_sense > 0 ? 
                    <div className="TextField">
                        <h4>Tremor Sense: </h4>
                        <p>{selected.tremor_sense}</p>
                    </div>:null}

                    {selected.telepathy > 0 ? 
                    <div className="TextField">
                        <h4>Telepathy: </h4>
                        <p>{selected.telepathy}</p>
                    </div>:null}

                    <svg height="5" width="100%" className="DividingLine">
                        <polyline points="0,0 400, 2.5 0,5"></polyline>
                    </svg>

                    <h1>Abilities</h1>
                    {selectedAbilities.length !== 0 ?
                    <div className="AbilityField">
                        {selectedAbilities.map((ability) => (
                            <div key={ability.ability_id} className="Abilities">
                                <h4>{ability.ability_name}:</h4>
                                <p>{ability.ability_description}</p>
                            </div> 
                        ))}
                    </div>:
                    <h4>No Abilities</h4>}

                </div>
                <div className="Border"></div>
            </div>
        </div>
    )
}

export default Entries; 