import s from './Button.module.css';

export default function Button({ onClick }) {
  return (
    <div className={s.Button_warper}>
      <button
        type="button"
        className={s.Button}
        onClick={() => {
          onClick();
        }}
      >
        Load more
      </button>
    </div>
  );
}
