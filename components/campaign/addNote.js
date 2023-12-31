import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic from 'next/dynamic'
import { createCampaignNote } from '../../api';

// Load ReactQuill dynamically only on the client side
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const AddNote = ({ campaignId, onNoteCreated }) => {
    const [openModal, setOpenModal] = useState(false);
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [description, setDescription] = useState('');
    const [personalNote, setPersonalNote] = useState(false);

    const handleButtonClick = async (event) => {
        event.preventDefault();
        const noteData = {
            campaign_id: campaignId,
            title,
            tags,
            description,
            personal_note: personalNote,
        };
        setOpenModal(false);
        await createCampaignNote(noteData);
        onNoteCreated();
    };

    return (
        <>
            <Button onClick={() => setOpenModal(true)}>Сделать заметку</Button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <form>
                    <Modal.Header>Добавить новую запись в историю кампании</Modal.Header>
                    <Modal.Body>
                        <div className="flex max-w-md flex-col gap-4">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="title" required value="Название" />
                                </div>
                                <TextInput id="title" type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
                                <div className="mb-2 block">
                                    <Label htmlFor="tags" value="Теги" />
                                </div>
                                <TextInput id="tags" type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="description" value="Описание" />
                                </div>
                                {typeof window !== 'undefined' &&
                                <ReactQuill theme="snow" value={description} onChange={(content) => {setDescription(content);}} />
                                }
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="remember" checked={personalNote} onChange={() => setPersonalNote(!personalNote)} />
                                <Label htmlFor="remember">Заметка мастера</Label>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" onClick={handleButtonClick}>
                            Создать
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};

export default AddNote;
