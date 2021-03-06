const buttonCriarTarefa = document.querySelector('#button__make__task');
const buttonApagaTudo = document.querySelector('#button__clear__all');
const buttonRemoverFinalizados = document.querySelector('#button__remove__finished');
const buttonSalvarTarefas = document.querySelector('#button__save__tasks');
const inputCriarTarefa = document.querySelector('#input__task');
const listaTarefas = document.querySelector('#tasks__list');
const removerSelecionado = document.querySelector('#button__remove__selected');
const moverCima = document.querySelector('#button__move__up');
const moverBaixo = document.querySelector('#button__move__down');
const botaoDeMenu = document.querySelector('#menu__button__label');
const asideContainer = document.querySelector('.container__aside');

let tarefas = [];
let tasks = {};
let gray = document.querySelector('.gray');

// Função para adicionar uma tarefa na lista clicando no botão CriarTarefa
buttonCriarTarefa.addEventListener('click', () => {
	if (inputCriarTarefa.value !== '') {
		let div = document.createElement('div');
		div.innerText = inputCriarTarefa.value;
		div.className = 'task';
		listaTarefas.appendChild(div);
		inputCriarTarefa.value = '';
		div = document.querySelector('#tasks__list').lastElementChild;
		let tasks = {
			text: div.innerText,
			class: div.className
		}
		tarefas.push(tasks);
	}
})

// Adiciona a cor cinza de background apenas para as li's
listaTarefas.addEventListener('click', (event) => {
	// Esses if's são para não colocar a cor cinza de background na ol
	if (event.target.classList.contains('task')) {
		if (gray == null) {
			event.target.classList.add('gray');
			gray = document.querySelector('.gray');
		} else {
			gray.classList.remove('gray');
			event.target.classList.add('gray');
			gray = document.querySelector('.gray');
		}
	} 
})

// Adiciona um risco na frente do texto das li's
listaTarefas.addEventListener('dblclick', (event) => {
	if (event.target == listaTarefas) {
	} else if (event.target.classList.contains('completed')) {
		event.target.classList.remove('completed')
		let sub = event.target;
		sublimed.pop(sub);
	} else {
		event.target.classList.add('completed');
		let sub = event.target;
		sublimed.push(sub);
	}
})

// Apaga todas as li's
buttonApagaTudo.addEventListener('click', () => {
	listaTarefas.innerText = '';
})

// Remove apenas as li's sublinhadas
buttonRemoverFinalizados.addEventListener('click', () => {
  const sublimed = document.querySelectorAll('.completed');
	for (let index = 0; index < sublimed.length; index++) {
		sublimed[index].remove();
	}
})

// Função para adicionar uma tarefa na lista apertando enter
inputCriarTarefa.addEventListener('keypress', (event) => {
	if (event.keyCode == 13) {
		if (inputCriarTarefa.value != '') {
		let li = document.createElement('li');
		li.innerText = inputCriarTarefa.value;
		li.className = 'task';
		listaTarefas.appendChild(li);
		inputCriarTarefa.value = '';
		li = document.querySelector('#tasks__list').lastElementChild;
		let tasks = {
			text: li.innerText,
			class: li.className
		}
		tarefas.push(tasks);
		}
	}
})

// Utilizando localStorage para manter as li's ao fechar a página
buttonSalvarTarefas.addEventListener('click', () => {
	let listaHTML = listaTarefas.innerHTML;
	localStorage.setItem('listaSalva', listaHTML);
})

function retomaElementos () {
	listaTarefas.innerHTML = localStorage.getItem('listaSalva');
	gray = document.querySelector('.gray');
}

retomaElementos();

// Remove o item selecionado
removerSelecionado.addEventListener('click', () => {
	let selecionado = document.querySelector('.gray');
	selecionado.remove();
})

// Mover elemento para cima
moverCima.addEventListener('click', () => {
	if (gray != null) {
		if (listaTarefas.firstElementChild.classList.contains('gray') == false) {
		let selecionado = document.querySelector('.gray');
		let selecionadoCima = document.querySelector('.gray').previousElementSibling;
		let text = selecionado.innerText;
		selecionado.innerText = selecionadoCima.innerText;
		selecionadoCima.innerText = text;
		selecionado.classList.remove('gray');
		selecionadoCima.classList.add('gray');
		gray = document.querySelector('.gray');
		if (selecionado.classList.contains('completed') == true && selecionadoCima.classList.contains('completed') == false) {
			selecionado.classList.remove('completed');
			selecionadoCima.classList.add('completed');
		} else if (selecionadoCima.classList.contains('completed') && selecionado.classList.contains('completed') == false) {
			selecionadoCima.classList.remove('completed');
			selecionado.classList.add('completed');
		}
	}
	}

})

// Mover elemento para baixo
moverBaixo.addEventListener('click', () => {
	if (gray != null) {
		if (listaTarefas.lastElementChild.classList.contains('gray') == false) {
			let selecionado = document.querySelector('.gray');
			let selecionadoBaixo = document.querySelector('.gray').nextElementSibling;
			let text = selecionado.innerText;
			selecionado.innerText = selecionadoBaixo.innerText;
			selecionadoBaixo.innerText = text;
			selecionado.classList.remove('gray');
			selecionadoBaixo.classList.add('gray');
			gray = document.querySelector('.gray');
			if (selecionado.classList.contains('completed') == true && selecionadoBaixo.classList.contains('completed') == false) {
				selecionado.classList.remove('completed');
				selecionadoBaixo.classList.add('completed');
			} else if (selecionadoBaixo.classList.contains('completed') && selecionado.classList.contains('completed') == false) {
				selecionadoBaixo.classList.remove('completed');
				selecionado.classList.add('completed');
			}
		}
	}

})

// Ajuda no escondimento do menu quando não estiver selecionado
botaoDeMenu.addEventListener('click', () => {
	if (asideContainer.style.display === 'flex') {
		asideContainer.style.display = 'none';
	} else {
		asideContainer.style.display = 'flex';
	}
})
