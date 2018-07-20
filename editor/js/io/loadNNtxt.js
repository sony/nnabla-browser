const NNtxt = function(){
    this.uploadNNtxt = () => {
        const targetInputElement = document.getElementById("upload_nntxt");

        const loadNntxt = event => {
            const result = event.target.files[0];
            const reader = new FileReader();

            reader.readAsText(result);

            reader.addEventListener("load", () => {
                this.loadedNetwork = reader.result;
                console.log(reader.result);
            });
        };

        targetInputElement.addEventListener("change", loadNntxt);

        targetInputElement.click();

    }
};

window.nntxt = new NNtxt();