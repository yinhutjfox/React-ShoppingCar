import React , { Component } from "react";
import GoodsTable from "../components/GoodsTable";
let goodsArray = [
	{id : 1 , src : "../static/img/1.jpg" , name : "商品1" , price : 45 , count : 9 , checked : false} ,
	{id : 2 , src : "../static/img/2.jpg" , name : "商品2" , price : 46, count : 1 , checked : false} ,
	{id : 3 , src : "../static/img/3.jpg" , name : "商品3" , price : 35, count : 8 , checked : true} ,
	{id : 4 , src : "../static/img/4.jpg" , name : "商品4" , price : 86 , count : 1 , checked : false} ,
	{id : 5 , src : "../static/img/5.jpg" , name : "商品5" , price : 4 , count : 3 , checked : false} ,
	{id : 6 , src : "../static/img/6.jpg" , name : "商品6" , price : 53 , count : 6 , checked : false} ,
	{id : 7 , src : "../static/img/7.jpg" , name : "商品7" , price : 66 , count : 1 , checked : false} ,
	{id : 8 , src : "../static/img/8.jpg" , name : "商品8" , price : 15 , count : 5 , checked : false} ,
	{id : 9 , src : "../static/img/9.jpg" , name : "商品9" , price : 6 , count : 8 , checked : false} ,
];

export default class MainPage extends Component
{
	constructor()
	{
		super();
		let count = 0;
		let price = 0;
		goodsArray.forEach(goods =>{
			if(goods.checked)
			{
				++count;
				price += goods.price * goods.count;
			}
		});
		this.state = {
			goodsArray : goodsArray ,
			selectedCount : count ,
			totalPrice : price ,
			isSelectAll : false
		};
		this.changeGoodsCheckFlag = this.changeGoodsCheckFlag.bind(this);
		this.changeSelectAllFlag = this.changeSelectAllFlag.bind(this);
		this.deleteGoods = this.deleteGoods.bind(this);
		this.removeAll = this.removeAll.bind(this);
		this.removeChecked = this.removeChecked.bind(this);
		this.setGoodsCount = this.setGoodsCount.bind(this);
	}

	updateCount(goodsArray)
	{
		let count = 0;
		goodsArray.forEach(goods =>{
			if(goods.checked)
			{
				++count;
			}
		});
		return count;
	}

	updatePrice(goodsArray)
	{
		let price = 0;
		goodsArray.forEach(goods =>{
			if(goods.checked)
			{
				price += goods.price * goods.count;
			}
		});
		return price;
	}

	updateSelectAllFlag(goodsArray)
	{
		for(let i = 0 ; i < goodsArray.length ; ++i)
		{
			if(!goodsArray[i].checked)
			{
				return false;
			}
		}
		return true;
	}

	removeAll()
	{
		this.setState({
			goodsArray : [] ,
			selectedCount : 0 ,
			totalPrice : 0 ,
			isSelectAll : false
		})
	}

	removeChecked()
	{
		this.setState((preState) =>({
			goodsArray : preState.goodsArray.filter(goods => {return !goods.checked;}) ,
			selectedCount : 0 ,
			totalPrice : 0 ,
			isSelectAll : false
		}));
	}

	deleteGoods(id)
	{
		this.setState((preState) =>{
			for(let i = 0 ; i < preState.goodsArray.length ; ++i)
			{
				if(id.toString() === preState.goodsArray[i].id.toString())
				{
					preState.goodsArray.splice(i , 1);
					break;
				}
			}
			return {
				goodsArray : preState.goodsArray ,
				selectedCount : this.updateCount(preState.goodsArray) ,
				totalPrice : this.updatePrice(preState.goodsArray) ,
				isSelectAll : this.updateSelectAllFlag(preState.goodsArray)
			}
		})
	}

	setGoodsCount(id , count)
	{
		this.setState((preState) =>{
			for(let i = 0 ; i < preState.goodsArray.length ; ++i)
			{
				if(id.toString() === preState.goodsArray[i].id.toString())
				{
					preState.goodsArray[i].count = count;
				}
			}
			return {
				goodsArray : preState.goodsArray ,
				selectedCount : this.updateCount(preState.goodsArray) ,
				totalPrice : this.updatePrice(preState.goodsArray) ,
				isSelectAll : this.updateSelectAllFlag(preState.goodsArray)
			}
		})
	}

	changeGoodsCheckFlag(id)
	{
		this.setState((preState) =>{
			preState.goodsArray.forEach(goods =>{
				if(id.toString() === goods.id.toString())
				{
					goods.checked = !goods.checked;
				}
			});
			return {
				goodsArray : preState.goodsArray ,
				selectedCount : this.updateCount(preState.goodsArray) ,
				totalPrice : this.updatePrice(preState.goodsArray) ,
				isSelectAll : this.updateSelectAllFlag(preState.goodsArray)
			}
		});
	}

	changeSelectAllFlag(event)
	{
		if(event.currentTarget.checked)
		{
			this.setState((preState) =>{
				let price = 0;
				let count = 0;
				preState.goodsArray.forEach(goods =>{
					goods.checked = true;
				});
				preState.goodsArray.forEach(goods =>{
					if(goods.checked)
					{
						++count;
						price += goods.price * goods.count;
					}
				});
				return {
					goodsArray : preState.goodsArray ,
					selectedCount : count ,
					totalPrice : price ,
					isSelectAll : true
				}
			});
		}
		else
		{
			this.setState((preState) =>{
				preState.goodsArray.forEach(goods =>{
					goods.checked = false;
				});
				return {
					goodsArray : preState.goodsArray ,
					selectedCount : 0 ,
					totalPrice : 0 ,
					isSelectAll : false
				}
			});
		}
	}

	render()
	{
		return (
			<div id = "MainPage" className = "container">
				<div className = "form-horizontal">
					<div className = "form-group">

					</div>
					<div className = "form-group">
						<div style = {{display : "table" , width : "100%"}}>
							<div style = {{display : "table-row" , width : "100%"}}>
								<div style = {{display : "table-cell" , fontSize : "30px" , textAlign : "left" , width : "10%"}}>
									购物车
								</div>
								<div style = {{display : "table-cell" , textAlign : "right" , width : "70%"}}>
									选中：{this.state.selectedCount} 个 总价：{this.state.totalPrice} 元
								</div>
								<div style = {{display : "table-cell" , textAlign : "right" , width : "20%"}}>
									<button className = "btn btn-danger btn-sm" style = {{margin : "auto 10px"}} onClick = {this.removeAll}><i className = "fa fa-trash"> 清空购物车</i></button>
									<button className = "btn btn-warning btn-sm" onClick = {this.removeChecked}><i className = "fa fa-times"> 删除选中</i></button>
								</div>
							</div>
						</div>
					</div>
					<div className = "form-group">
						<GoodsTable setGoodsCount = {this.setGoodsCount} changeGoodsCheckFlag = {this.changeGoodsCheckFlag} deleteGoods = {this.deleteGoods} goodsList = {this.state.goodsArray}
							thead = {
								<tr>
									<td>
										<span>全选</span>
										<input type = "checkbox" checked = {this.state.isSelectAll} onChange = {this.changeSelectAllFlag} />
									</td>
									<td>商品图片</td>
									<td>商品名称</td>
									<td>单价</td>
									<td>数量</td>
									<td>总价</td>
									<td>操作</td>
								</tr>
							}
						/>
					</div>
				</div>
			</div>
		);
	}
}