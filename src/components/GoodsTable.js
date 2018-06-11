import React , { Component } from "react";

export default class GoodsTable extends Component
{
	constructor(props)
	{
		super(props);
		this.makeGoodsList = this.makeGoodsList.bind(this);
		this.goodsCheckFlagChange = this.goodsCheckFlagChange.bind(this);
		this.deleteGoods = this.deleteGoods.bind(this);
		this.countInput = this.countInput.bind(this);
		this.minusClick = this.minusClick.bind(this);
		this.plusClick = this.plusClick.bind(this);
	}

	goodsCheckFlagChange(event)
	{
		this.props.changeGoodsCheckFlag(event.currentTarget.getAttribute("data-goodsid"));
	}

	deleteGoods(event)
	{
		this.props.deleteGoods(event.currentTarget.getAttribute("data-goodsid"));
	}

	countInput(event)
	{
		let temp = event.currentTarget.value;
		temp = temp.replace(/[^0-9]/g , "");
		if("" !== temp)
		{
			temp = parseInt(temp , 10);
		}
		else
		{
			temp = 0;
		}
		this.props.setGoodsCount(event.currentTarget.getAttribute("data-goodsid") , temp);
		event.currentTarget.value = temp;
	}

	plusClick(event)
	{
		let countInput = event.currentTarget.previousSibling;
		let temp = parseInt(countInput.value , 10);
		this.props.setGoodsCount(countInput.getAttribute("data-goodsid") , ++temp);
		countInput.value = temp;
	}

	minusClick(event)
	{
		let countInput = event.currentTarget.nextSibling;
		let temp = parseInt(countInput.value , 10);
		if(0 !== temp)
		{
			this.props.setGoodsCount(countInput.getAttribute("data-goodsid") , --temp);
		}
		countInput.value = temp;
	}

	makeGoodsList()
	{
		let goodsList = [];
		this.props.goodsList.forEach(goods =>{
			goodsList.push(
				<tr key = {goods.id}>
					<td>
						<input type = "checkbox" data-goodsid = {goods.id} checked = {goods.checked} onChange = {this.goodsCheckFlagChange} />
					</td>
					<td className = "col-xs-1">
						<img src = {goods.src} className = "img-responsive" alt = "你等着吧..." />
					</td>
					<td>{goods.name}</td>
					<td>{goods.price}</td>
					<td style = {{position : "relative" , width : "10%"}}>
						<div style = {{position : "relative" , width : "30%" , left : "35%"}}>
							<button style = {{position : "absolute" , width : "80%" , left : "-80%"}} onClick = {this.minusClick}>
								<i className = "fa fa-minus"></i>
							</button>
							<input data-goodsid = {goods.id} style = {{position : "relative" , width : "100%" , textAlign : "center"}} defaultValue = {goods.count} onInput = {this.countInput} />
							<button style = {{position : "absolute" , width : "80%" , right : "-80%" , top : "0px"}} onClick = {this.plusClick}>
								<i className = "fa fa-plus"></i>
							</button>
						</div>
					</td>
					<td>{parseInt(goods.count , 10) * goods.price}</td>
					<td>
						<button className = "btn btn-danger btn-xs" data-goodsid = {goods.id} onClick = {this.deleteGoods}><i className = "fa fa-times"></i></button>
					</td>
				</tr>
			);
		});
		return goodsList;
	}

	render()
	{
		return (
			<table id = "GoodsTable" className = "table table-hover">
				<thead>
					{this.props.thead}
				</thead>
				<tbody>
					{this.makeGoodsList()}
				</tbody>
			</table>
		);
	}
}