import {Button, Checkbox, Label, Modal, Textarea, TextInput} from 'flowbite-react';
import {useState} from 'react';

const AddNote = ({ campaignId }) => {
    console.log('Campaign ID:', campaignId);
    const [openModal, setOpenModal] = useState(false);

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
                                    <Label htmlFor="title" value="Название"/>
                                </div>
                                <TextInput id="title" type="text" required/>
                                <div className="mb-2 block">
                                    <Label htmlFor="tags" value="Теги"/>
                                </div>
                                <TextInput id="tags" type="text" required/>
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="description" value="Описание"/>
                                </div>
                                <Textarea id="description" required rows={4} />
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="remember"/>
                                <Label htmlFor="remember">Заметка мастера</Label>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit">Создать</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default AddNote;
