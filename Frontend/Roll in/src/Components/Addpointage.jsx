const Addpoint = () => {

    return (
        <div>
            <div className="flex flex-col items-center h-[440px] pt-6 sm:justify-center sm:pt-0 ">
                <div className="w-full px-6 py-4 mt-6 overflow-auto bg-white  shadow-md sm:max-w-md sm:rounded-lg">
                    <form>
                        <div>
                            <label
                                htmlFor="date"
                                className="block text-sm  font-medium text-gray-700 undefined"
                            >
                                Date
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="date"
                                    name="date"
                                    id="date-input"
                                    className="block w-full mt-1 h-[33px] border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="starttime"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Heures d'entrée
                            </label>
                            <div className="flex flex-col items-start">
                                <input 
                                    type="time"
                                    name="starttime"
                                    className="block w-full mt-1 h-[33px] border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-end mt-4">
                            <button 
                                type="submit"
                                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                            >
                                Ajouter
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default Addpoint;