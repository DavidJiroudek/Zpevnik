const tagsData = (element) => {
    switch (element.tagName) {
        case "CH":
            return {
                style:{
                    top: (element.offsetTop - 15),
                    left: element.offsetLeft,
                    position: "absolute",
                    zindex: 6 
                  },
                className: "chordSign",
                tagId: element.id,
                value: element.getAttribute("chordValue"),
                sufix: element.getAttribute("sufix"),
                params:{}
            }
        case "VERSE":
            return {
                style:{
                    top: (element.offsetTop + 3 ),
                    left: element.offsetLeft -15,
                    position: "absolute",
                    zindex: 6 ,
                    width: "max-content"
                },
                className: "verseSign",
                tagId: element.id,
                value: element.getAttribute("verseValue") + ")",
                sufix: "",
                params:{}
            }
            case "DYN":
            return {
                style:{
                    top: (element.offsetTop - 15),
                    left: element.offsetLeft,
                    position: "absolute",
                    fontStyle: "italic",
                    zindex: 6 
                  },
                className: "dynSign",
                tagId: element.id,
                value: element.getAttribute("dynType"),
                sufix: "",
                params:{}
            }

        default:
            return null;
    }

}
export default tagsData;