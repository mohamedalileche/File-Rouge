
function NewPost() {
    return (
        <div className="py-[250px] w-[80%] h-[250px] flex flex-col items-center justify-center bg-white border border-gray-200 rounded-[5px] shadow dark:bg-gray-800 dark:border-gray-700">
            <form  className="w-[80%] flex flex-col items-center justify-center gap-2 shadow-sm">
                <label >Titre:</label>
                <input  type="text" id="project_Titre" className="  w-[70%] h-[60px] border-2 border-gray-300 rounded " />
                <label >Contenu:</label>
                <input  type="text" id="project_Titre" className=" w-[70%] h-[80px] border-2 border-gray-300 rounded " />
                <div className="inline-flex w-full items-center justify-center gap-2">           
                    <button type="submit" className="px-4 py-2 bg-black rounded text-white">Ajouter</button>

                </div>
            </form>
        </div>
    );
}
export default NewPost;







