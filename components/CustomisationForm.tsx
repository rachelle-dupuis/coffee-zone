export const CustomisationForm = () => {
    return (
        <>
            <h2 className="mb-3 text-lg font-bold">Customise Your Drink!</h2>
            <form>
                <div>
                    <label className="mb-2 block font-bold" htmlFor="shotsInput">Shots</label>
                    <input
                        type="number"
                        min={0}
                        defaultValue={2}
                        id="shotsInput"
                        className="appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                    />
                </div>
            </form>
        </>
    );
};
