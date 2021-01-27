declare type TargetElements = Element | Comment;
declare type ContentElements = TargetElements | Text;
declare function clear(target: Comment): void;
declare function remove(target: TargetElements): void;
declare function before(target: TargetElements, node: ContentElements): void;
declare function prepend(target: TargetElements | DocumentFragment, node: ContentElements): void;
declare function append(target: TargetElements | DocumentFragment, node: ContentElements): void;
declare function after(target: TargetElements, node: ContentElements): void;
export { remove, before, prepend, append, after, clear, ContentElements, TargetElements, };
declare global {
    interface Comment {
        _children: ContentElements[];
        _parent?: Comment;
    }
    interface Element {
        _parent?: Comment;
    }
    interface Text {
        _parent?: Comment;
    }
}
