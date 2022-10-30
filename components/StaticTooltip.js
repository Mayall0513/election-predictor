export default (props) => {
    const { contents } = props;

    return (
        <>
            <button type="button" className="link-button static-tooltip">
                (?)
                <div className="tooltip static-tooltip-contents ">
                    {contents}
                </div>
            </button>
            
        </>
    );
};