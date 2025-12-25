
import { RxPlus } from "react-icons/rx";
import { FiTrash } from 'react-icons/fi';
import { RxCross2 } from "react-icons/rx";
import { FiPlus } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const NotionKanban = () => {
    return (
        <div className="h-screen w-full bg-neutral-900 text-neutral-50">
            <Board />
        </div>
    );
};

const Board = () => {
    const [cards, setCards] = useState([]);
    const [hasChecked, setHasChecked] = useState(false);

    useEffect(() => {
        hasChecked || localStorage.setItem("cards", JSON.stringify(cards))
     }, [cards, hasChecked]);

    useEffect(() => { 
        const cardData = localStorage.getItem("cards");
        setCards(cardData ? JSON.parse(cardData) : []);
        setHasChecked(true);
    }, []);

    return (
        <div className="flex h-full w-full gap-3 overflow-scroll p-12">
            <Column
                title="Backlog"
                column="backlog"
                headingColor="text-red-600"
                cards={cards}
                setCards={setCards}
            />
            <Column
                title="TODO"
                column="todo"
                headingColor="text-yellow-300"
                cards={cards}
                setCards={setCards}
            />
            <Column
                title="In Progress"
                column="doing"
                headingColor="text-cyan-400"
                cards={cards}
                setCards={setCards}
            />
            <Column
                title="Completed"
                column="done"
                headingColor="text-green-400"
                cards={cards}
                setCards={setCards}
            />
            <DeleteBox setCards={setCards} />
        </div>
    );
};

const Column = ({ title, headingColor, column, cards, setCards }) => {

    const [active, setActive] = useState(false);

    const handleDragStart = (event, card) => {
        event.dataTransfer.setData('cardId', card.id);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        highlightIndicator(event)
        setActive(true);
    }

    const handleDragLeave = () => {
        setActive(false);
        clearHighLights();
    }

    const handleDragEnd = (event) => {
        setActive(false);
        clearHighLights();

        const cardId = event.dataTransfer.getData('cardId');
        const indicators = getIndicators();
        const { element } = getNearestIndicator(event, indicators);
        const before = element.dataset.before || "-1"

        if (before !== cardId) {
            let copy = [...cards];
            let cardToTransfer = copy.find((card) => card.id === cardId);

            if (!cardToTransfer) {
                return;
            }

            cardToTransfer = { ...cardToTransfer, column };
            copy = copy.filter((card) => card.id !== cardId);

            const moveBack = before === "-1" ;

            if (moveBack) {
                copy.push(cardToTransfer);
            } else {
                const insertAtIndex = copy.findIndex((card) => card.id === before);

                if (insertAtIndex === undefined) { 
                    return;
                }

                copy.splice(insertAtIndex, 0, cardToTransfer);
            }
            
            setCards(copy);
        }
    }

    const highlightIndicator = (event) => {
        const indicators = getIndicators();
        clearHighLights(indicators);
        const el = getNearestIndicator(event, indicators);
        el.element.style.opacity = '1';
    }

    const clearHighLights = (indElems) => { 
        const indicators = indElems || getIndicators();

        indicators.forEach((indicator) => {
            indicator.style.opacity = '0';
        });
    }

    const getNearestIndicator = (event, indicators) => { 
        const DISTANCE_OFFSET = 50;
        const element = indicators.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = event.clientY - (box.top + DISTANCE_OFFSET);

            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
         }, 
            {
                offset: Number.NEGATIVE_INFINITY,
                element: indicators[indicators.length - 1]
            }

        )
        return element;
    }
    
    const getIndicators = () => { 
        return Array.from(document.querySelectorAll(`[data-column='${column}']`));
    }

    

    const filteredCards = cards.filter((card) => card.column === column);

    return (
        <div className='w-56 shrink-0'>
            <div className='mb-3 flex items-center justify-between'>
                <h3 className={`font-medium ${headingColor}`}>{title}</h3>
                <span className='rounded text-sm text-neutral-400>'>
                    {filteredCards.length}
                </span>
            </div>
            <div
                onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDragEnd}
                className={`h-full w-full transition-colors ${active ? 'bg-neutral-800/50' : 'bg-neutral-800/0'}`}>
                {filteredCards.map((card) => {
                    return <Card key={card.id} {...card} handleDragStart={handleDragStart} />;
                })}
                <DropIndicator column={column} beforeId="-1" />
                <AddCard column={column} setCards={setCards} />
            </div>
        </div>
    );
};

const AddCard = ({ column, setCards }) => {
    const [text, setText] = useState('');
    const [adding, setAdding] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (text.trim() === '') {
            setText("");
            return; // Prevent adding empty cards
        }

        setCards((prevCards) => [
            ...prevCards,
            {
                id: Date.now().toString(),
                title: text.trim(),
                column
            }
        ]);

        setText('');
        setAdding(false);
    };

    return (
        <>
            {adding ? (
                <motion.form layout onSubmit={handleSubmit}>
                    <textarea
                        onChange={(event) => setText(event.target.value)}
                        auto-focus
                        placeholder='Add new task...'
                        className='w-full rounded border
                        border-green-700 bg-[#19272e]
                        p-3 text-sm text-[#b3c6b7] placeholder-[#f6e0e0] focus:outline-0'
                    />
                    <div className='mt-1.5 flex items-center gap-2 justify-end'>
                        <span className="rounded-md bg-pink-400/10 py-1 text-xs font-medium inset-ring inset-ring-pink-400/40 shadow-xs shadow-red-300/50">
                            <button
                                onClick={() => setAdding(false)}
                                className='px-3 text-xs text-neutral-200
                                 transition-colors hover:text-red-500 flex items-center gap-1'>
                                Cancel
                                <RxCross2 />
                            </button>
                        </span>
                        <span className="rounded-md bg-[#34b95c] py-1 text-xs font-medium inset-ring inset-ring-green-500/40 shadow-xs shadow-green-200">
                            <button
                                type='submit'
                                className='px-3 text-xs text-[#000000]
                                transition-colors hover:text-[#ffffff] flex items-center gap-1'>
                                Add
                                <RxPlus />
                            </button>
                        </span>
                    </div>
                </motion.form>
            ) : (
                <motion.button layout
                    onClick={() => setAdding(true)}
                    className='flex w-full items-center gap-1.5 px-3 py-1.5
                    text-base text-neutral-200 transition-colors hover:text-green-400'>
                    <span>Add Card</span>
                    <span>
                        <FiPlus />
                    </span>
                </motion.button>
            )}
        </>
    );
};

const Card = ({ title, id, column, handleDragStart }) => {
    return (
        <>
            <DropIndicator beforeId={id} column={column} />
            <motion.div
                layout
                layoutId={id}
                draggable="true"
                onDragStart={(event) => handleDragStart(event, { title, id, column })}
                className='cursor-grab rounded border
            border-neutral-600 bg-neutral-800 p-3 active:cursor-grabbing hover:bg-neutral-700/80'>
                <p className='text-sm text-neutral-100'>
                    {title}
                </p>
            </motion.div>
        </>
    );
};

const DropIndicator = ({ beforeId, column }) => {
    return (
        <div
            data-before={beforeId || "-1"}
            data-column={column}
            className='my-0.5 h-0.5 w-full bg-linear-to-r from-violet-500 to-violet-400 opacity-0' />
    );
};

const DeleteBox = ({ setCards }) => {
    const [active, setActive] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleDragOver = (event) => {
        event.preventDefault();
        setActive(true);
    };

    const handleDragLeave = () => {
        setActive(false);
    };

    const handleDragEnd = (event) => {
        event.preventDefault();
        const cardId = event.dataTransfer.getData('cardId');
        setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
        setActive(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 1200);
    };

    return (
        <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDragEnd} className={`relative group
            mt-10 grid h-56 w-56 shrink-0 place-content-center rounded
            border text-3xl hover:text-4xl transition-all hover:text-[#ff0000]
            hover:border-red-500 hover:shadow-amber-100/20 hover:shadow-xs
            data-tooltip-target="tooltip-default"
            ${active ?
                'border-red-800 bg-red-800/20 text-red-500' :
                'border-neutral-500 bg-neutral-500/20 text-neutral-500'}
        `}
        >
            {active ? <FiTrash className='animate-bounce' /> : !showSuccess ?
                <div>
                    <div className="relative group">
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full
                    mb-2 hidden group-hover:block w-max bg-[#ff0000]
                    text-white text-base rounded px-2 py-2">
                            Drag here to delete task

                            <div className="absolute left-1/2 -translate-x-1/2 top-full
                        h-0 w-0 border-l-8 border-r-8 border-t-6 border-l-transparent
                        border-r-transparent border-t-[#ff0000]" />

                        </div>

                        <FiTrash />
                    </div>
                </div> :
                <div className="relative left-1/2 -translate-x-1/2
                bg-green-600 text-white text-base rounded px-2 py-2">
                    Task deleted successfully!
                </div>
            }

        </div>
    );
};
const DEFAULT_CARDS = [
    // Backlog
    { title: 'Look into render bug in dashboard', id: '1', column: 'backlog' },
    { title: 'SOX compliance checklist', id: '2', column: 'backlog' },
    { title: '[SPIKE] Migrate to Azure', id: '3', column: 'backlog' },
    { title: 'Document Notificaton Service', id: '4', column: 'backlog' },

    // TODO
    { title: 'Research DB options for new microservices', id: '5', column: 'todo' },
    { title: 'Postmortem for outage', id: '6', column: 'todo' },
    { title: 'Sync with product on Q3 roadmap', id: '7', column: 'todo' },

    // DOING
    { title: 'Refactor context providers to use Zustang', id: '8', column: 'doing' },
    { title: 'Add logging to daily CRON', id: '9', column: 'doing' },

    // DONE
    { title: 'Set up DD dashboards for Lambda listener', id: '10', column: 'done' },
    { title: 'Add logging to daily CRON', id: '11', column: 'done' }

];