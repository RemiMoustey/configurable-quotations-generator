class Generator {

    constructor() {
        this.currentQuotations = {
            firstSegment: ["Avec la restriction actuelle", "Considérant l'orientation générale",
            "Eu égard à la crise conjoncturelle", "Nonobstant la difficulté observée",
            "Du fait de l'inertie de ces derniers temps", "En ce qui concerne la dégradation de l'époque actuelle",
            "Dans le cas particulier de l'austérité présente", "Tant que durera la morosité que nous constatons",
            "Malgré l'ambiance de cette époque", "Pour réagir face à la fragilité contextuelle"],

            secondSegment: ["il convient d'anticiper la majorité des", "on se doit d'imaginer l'ensemble des",
            "il est préférable de remodeler la somme des", "il serait intéressant d'avoir à l'esprit la majorité des",
            "il ne faut pas négliger de se remémorer la totalité des", "on ne peut se passer de gérer la globalité des",
            "il serait bon de fédérer les relations des", "il faut de toute urgence comprendre la plus grande partie des",
            "je recommande d'analyser systématiquement les", "il ne faut pas s'interdire d'expérimenter précisément les"],

            thirdSegment: ["solutions imaginables à long terme", "issues possibles pour longtemps",
            "problématiques de bons sens à l'avenir", "voies s'offrant à nous pour le futur",
            "alternatives envisageables à court terme", "organisations matricielles éventuelles rapidement",
            "améliorations réalisables dans une perspective correcte", "synergies déclinables même si ce n'est pas facile",
            "modalités optimales avec beaucoup de recul", "stratégies opportunes très attentivement"]
        };

        this.cookingQuotations = {
            firstSegment: ["Avec les ingrédients du moment", "Considérant les difficultés de la cuisson au four",
            "Eu égard à la nécessité d'un assemblage goûteux", "Pour diversifier la cuisine quotodienne",
            "Attendu que l'on doit vivre pour manger", "Concernant le plaisir de manger",
            "En fonction de la fraîcheur des produits", "Constatant que l'alimentation fiat partie des nécessités et plaisirs quotidiens",
            "Malgré l'impossibilité de cuisiner sans effort", "Afin d'assurer le bon déroulement d'un repas"],

            secondSegment: ["il est possible de donner naissance à des", "il est indispensable de prendre soin des",
            "on se doit de donner de son temps pour des", "il serait intéressant de connaître la recette miracle des",
            "il ne faut pas négliger la question du dressage des", "je considère qu'il est nécessaire de tester les",
            "on ne doit aucunement passer à côté des", "il faut de toute urgence rappeler l'importance des",
            "je recommande de privilégier essentiellement les", "il est nécessaire de savoir comment cuisiner des"],

            thirdSegment: ["mets très rares mais très goûteux", "délices auxquels nous souhaitons donner naissance",
            "sandwiches qui ne donneront pas envie de manger à table", "pizzas des grands palaces",
            "garnisons cueillies du jour", "produits exotiques et incongrus",
            "plaisirs des fruits du potager du coin", "crèmes glacées rafraîchissantes",
            "charcuteries et terrines de campagne", "saucisses accompagnées de purée de pommes de terre"]
        }

        this.initialFormQuotations = document.getElementById("formQuotations").innerHTML;
        this.initialFormNewQuotations = document.getElementById("formNewQuotations").innerHTML;

        this.generateAllQuotations();
    }

    generateAllQuotations = () => {
        document.querySelector("#formQuotations").addEventListener("submit", (e) => {
            e.preventDefault();
            let allQuotations = this.getAllQuotations(document.getElementById("formQuotations").elements.topic.value,
            document.getElementById("formQuotations").elements.numberQuotations.value);
            this.printQuotations(allQuotations);
        });
    }

    drawRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    generateQuotation = (topic) => {
        let quotation = "";
        let selectedSegments;
        if(topic === "current") {
            selectedSegments = this.currentQuotations;
        } else if(topic === "cooking") {
            selectedSegments = this.cookingQuotations;
        }
        
        for(let i = 0; i < 3; i++) {
            if(i === 0) {
                    quotation += selectedSegments.firstSegment[this.drawRandomNumber(0, 9)] + ", ";
            } else if(i === 1) {
                    quotation += selectedSegments.secondSegment[this.drawRandomNumber(0, 9)] + " ";
            } else if(i === 2) {
                    quotation += selectedSegments.thirdSegment[this.drawRandomNumber(0, 9)] + ".";
            }
        }
        return quotation;
    }

    getAllQuotations = (topic, numberOfQuotations) => {
        let allQuotations = [];
        for(let i = 0; i < numberOfQuotations; i++) {
            allQuotations.push(this.generateQuotation(topic));
        }

        return allQuotations;
    }

    printQuotations = (quotations) => {
        document.querySelector("#formQuotations").innerHTML = "";
        if(document.getElementById("quotations") !== "") {
            document.getElementById("quotations").textContent = "";
        }

        for(let quotation of quotations) {
            let paragraph = document.createElement("p");
            paragraph.textContent = quotation;
            document.getElementById("quotations").appendChild(paragraph);
        }
        document.getElementById("formNewQuotations").style.display = "block";
        this.manageNewQuotations();
    }

    manageNewQuotations = () => {
        document.querySelector("#formNewQuotations").addEventListener("submit", (e) => {
            e.preventDefault();
            document.querySelector("#formNewQuotations").style.display = "none";
            if(document.getElementById("yes").checked) {
                document.getElementById("quotations").textContent = "";
            } else if(document.getElementById("no").checked) {
                document.querySelector("#formQuotations").style.display = "none";
                let endedProgram = document.createElement("p");
                endedProgram.textContent = "Le programme est terminé";
                document.querySelector("body").appendChild(endedProgram);
            }
            document.querySelector("#formQuotations").innerHTML = this.initialFormQuotations;
            document.querySelector("#formNewQuotations").innerHTML = this.initialFormNewQuotations;
        });
    }
}

new Generator();