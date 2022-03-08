import { useState } from "react";
import styles from"./List.module.scss";

type listProps = {
    initialItems: string[]
}

export default function List({ initialItems }: listProps){
    const [list, setList] = useState(initialItems);
    const [newItem, setNewItem] = useState('');

    function addToList(){
        setTimeout(() => {
            setList(state => [...state, newItem]);
            setNewItem('');
        }, 500)
    }

    function removeFromList(removeItem: string){
        setTimeout(() => {
            setList(state => state.filter(item => item !== removeItem));
        }, 500)
    }

    return (
        <div className={styles.container}>
            <span>
                <input placeholder="New Item" value={newItem} onChange={e => setNewItem(e.target.value)} />
                <button onClick={addToList}>Add</button>
            </span>
            <ul>
                {list.map((item, index) => (
                <li key={item + index}>
                    {item}
                    <button onClick={() => removeFromList(item)}>Remove</button>          
                </li>
                ))}
            </ul>
        </div>
    );
}