export interface GraphNode<T>{
    current:T
    nextNode:GraphNode<T>[]
}